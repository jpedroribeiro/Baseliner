var colors = jsColorPicker('input.color', {
    customBG: '#ccc',
    readOnly: true,
    init: function(elm, colors) {
      elm.style.backgroundColor = elm.value;
      elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
    }
  });
