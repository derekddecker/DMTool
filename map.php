<html>
<head>
    <link rel="stylesheet" href="css/reset.css" media="screen" />
    <link rel="stylesheet" href="css/jquery-ui-1.8.18.custom.css" media="screen" />
    <link rel="stylesheet" href="css/colorpicker.css" media="screen" />
    <script src="js/colorpicker.min.js" type="text/javascript"></script>
    <script src="js/Util.js" type="text/javascript"></script>
    <script src="js/jquery.min.js" type="text/javascript"></script>
    <script src="js/jquery-ui-1.8.18.custom.min.js" type="text/javascript"></script>
    <script type="text/javascript">
        var current_color,
        set_current_color = (function(hex){
            current_color = hex;
            $('#current_color').css({'background-color':hex})
        });
        $(function(){

            $('#map-container').draggable({
                start:function(){
                    if(checkDrawing()) return false;
                },
                stop:function(){
                    get_canvas_page_offset();
                }
            }).resizable({
                start:function(){
                    var map_container = $('#map-container');
                    old_size_x = map_container.innerWidth();
                    old_size_y = map_container.innerHeight();
                },
                stop: function(){
                    var map_container = $('#map-container');
                    new_size_x = map_container.innerWidth();
                    new_size_y = map_container.innerHeight();
                    var scale_factor_x = new_size_x  / old_size_x;
                    var scale_factor_y = new_size_y  / old_size_y;

                    old_map_copy = document.getElementById('temp_canvas');
                    clear_canvas(old_map_copy);
                    old_map_copy_context = old_map_copy.getContext('2d')
                    old_map_copy_context.scale(scale_factor_x,scale_factor_y);
                    old_map_copy_context.drawImage(map_canvas, 0, 0);


                    drawCanvas(grid_canvas, grid_context);
                    //clear & update the canvas
                    clear_canvas(map_canvas);

                    old_map_copy = document.getElementById('temp_canvas');
                    overlay = old_map_copy;
                    clickX = [];
                    clickY = [];
                    clickDrag = [];
                    clickSize = [];
                    clickColor = [];
                    redraw();
                }
            });

            var old_map_copy,
                old_map_copy_context,
                old_size_x,
                old_size_y,
                new_size_x,
                new_size_y,
                clickX = [],
                clickY = [],
                clickDrag = [],
                clickSize = [],
                clickColor = [],
                overlay,
                get_canvas_page_offset = (function(){
                    canvas_page_offset = $('#map-container').offset();
                }),
                checkDrawing = (function(){
                    return $('#draw').is(':checked');
                }),
                clear_canvas = (function(canvas){
                    canvas.width = $('#map-container').innerWidth();
                    canvas.height = $('#map-container').innerHeight();
                }),
                currently_drawing = false,
                grid_canvas = document.getElementById('grid'),
                map_canvas = document.getElementById('map'),
                get_form_params = (function(){ return window.Util.GetHashFromSerializedArray( $('#map-grid-attributes').serializeArray() ); }),
                drawCanvas = (function(canvas, ctx){
                    var $params = get_form_params(),
                        xPos = 0,
                        yPos = 0,
                        canvasWidth = $('#map-container').innerWidth(),
                        canvasHeight = $('#map-container').innerHeight(),
                        widthIterator = (canvasWidth / $params['grid-size-x']),
                        heightIterator = (canvasHeight / $params['grid-size-y']);

                    //clear & update the canvas
                    clear_canvas(canvas);

                    //draw vertical lines
                    for(xPos; xPos <= canvasWidth; xPos+=widthIterator)
                    {
                        ctx.beginPath();
                        ctx.moveTo(xPos,0);
                        ctx.lineTo(xPos,canvasHeight);
                        ctx.closePath();
                        ctx.stroke();
                    }

                    //draw horizontal lines
                    for(yPos; yPos <= canvasHeight; yPos+=heightIterator)
                    {
                        ctx.beginPath();
                        ctx.moveTo(0,yPos);
                        ctx.lineTo(canvasWidth,yPos);
                        ctx.closePath();
                        ctx.stroke();
                    }

                    return false;
                }),
                redraw = function(){
                    map_canvas.width = map_canvas.width; // Clears the canvas

                    //adds any old drawing info back to the canvas
                    if(overlay) map_context.drawImage(overlay, 0, 0);

                    map_context.lineJoin = "round";

                    for(var i=0; i < clickX.length; i++)
                    {
                        map_context.strokeStyle = clickColor[i];
                        map_context.lineWidth = clickSize[i];
                        map_context.beginPath();
                        if(clickDrag[i] && i){
                            map_context.moveTo(clickX[i-1], clickY[i-1]);
                        }else{
                            map_context.moveTo(clickX[i]-1, clickY[i]);
                        }
                        map_context.lineTo(clickX[i], clickY[i]);
                        map_context.closePath();
                        map_context.stroke();
                    }
                };

            get_canvas_page_offset();

            if(grid_canvas.getContext){
                var map_context = map_canvas.getContext('2d'),
                    grid_context = grid_canvas.getContext('2d');
                clear_canvas(grid_canvas);
                clear_canvas(map_canvas);
            }

            else alert('Please use a canvas compatible browser to use the map feature. (Chrome, Firefox)')

            $('#map-grid-attributes').on('submit',function(){ return drawCanvas(grid_canvas, grid_context); }).trigger('submit');
            $('#grid').bind('mousedown',function(e){
                    if(checkDrawing())
                    {
                        currently_drawing = true;
                        clickX.push(e.pageX - canvas_page_offset.left);
                        clickY.push(e.pageY - canvas_page_offset.top);
                        clickDrag.push(false);
                        clickColor.push(current_color);
                        clickSize.push(get_form_params()['pencil-width']);
                        redraw();
                    }
                })
                .bind('mouseleave',function(){ currently_drawing = false; })
                .bind('mouseup',function(){ currently_drawing = false; })
                .bind('mousemove',function(e){
                    if(currently_drawing && checkDrawing()){
                        clickX.push(e.pageX - canvas_page_offset.left);
                        clickY.push(e.pageY - canvas_page_offset.top);
                        clickDrag.push(true);
                        clickColor.push(current_color);
                        clickSize.push(get_form_params()['pencil-width']);
                        redraw();
                    }
                });
            set_current_color('#333');
        })
    </script>
    <style type="text/css">
        #map-container{ border: 1px solid black; width:800px; height:300px; position:relative; float:left; }
            canvas { width:100%; height:100%; position:absolute; top:0; left:0; cursor:pointer;  }
            #grid{ z-index:999; }
        #temp_canvas{display:none;}
        #current_color{height:90px;width:90px;float:left;margin:0 5px}
    </style>
</head>
<body>

<form id="map-grid-attributes">
    <label for="grid-size-x">Grid Size X</label><input type="text" name="grid-size-x" id="grid-size-x" value="25" />
    <label for="grid-size-x">Grid Size Y</label><input type="text" name="grid-size-y" id="grid-size-y" value="10" />
    <button>Update</button>

    <div class="clear"></div>
    <input type="checkbox" id="draw" /><label for="draw">Enable Draw Mode?</label>
    <div class="clear"></div>
    Pencil Width:
    <input type="radio" name="pencil-width" id="pencil-width-1" value="1"/><label for="pencil-width-1">Tiny</label>
    <input type="radio" name="pencil-width" id="pencil-width-3" value="3" checked/><label for="pencil-width-3">Regular</label>
    <input type="radio" name="pencil-width" id="pencil-width-6" value="6"/><label for="pencil-width-6">Large</label>
    <input type="radio" name="pencil-width" id="pencil-width-12" value="12"/><label for="pencil-width-12">X-Large</label>

    <div class="clear"></div>

    <div style="float:left;">
        <div id="color-picker" class="cp-small">
            <div>Color:</div>
            <div class="picker-wrapper">
                <div id="picker" class="picker"></div>
                <div id="indicator-picker" class="picker-indicator"></div>
            </div>
            <div class="slide-wrapper">
                <div id="slide" class="slide"></div>
                <div id="indicator-slide" class="slide-indicator"></div>
            </div>
        </div>
        <div class="clear"></div>
        <div id="current_color"></div>
        <script type="text/javascript">
            ColorPicker(
                document.getElementById('slide'),
                document.getElementById('picker'),
                function(hex, hsv, rgb, mousePicker, mouseSlide) {
                    set_current_color( hex );
                    ColorPicker.positionIndicators(
                        document.getElementById('indicator-slide'),
                        document.getElementById('indicator-picker'),
                        mouseSlide, mousePicker);
                });
        </script>
    </div>
</form>
<div id="map-container">
    <canvas id="map"></canvas>
    <canvas id="grid">
        <p>Your browser doesn't support canvas.</p>
    </canvas>
</div>
<div id="last_click"></div>
<canvas id="temp_canvas"></canvas>
</body>
</html>