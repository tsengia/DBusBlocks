/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse : true, 
	comments : true, 
	disable : true, 
	maxBlocks : Infinity, 
	trashcan : true, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'media/', 
	rtl : false, 
	scrollbars : true, 
	sounds : true, 
	oneBasedIndex : true
};

var blocklyDiv = document.getElementById("blockly-workspace");
/* Inject your workspace */ 
var workspace = Blockly.inject("blockly-workspace", options);

var blocklyArea = document.getElementById("blockly-area");

var onresize = function(e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

Blockly.DBusIntrospection = {};

var introspectionPreamble = '<!DOCTYPE node PUBLIC "-//freedesktop//DTD D-BUS Object Introspection 1.0//EN" "http://www.freedesktop.org/standards/dbus/1.0/introspect.dtd">\n';

//https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function saveTextFile(filename, data) {
    var blob = new Blob([data], {type: 'text/xml'});
    if(window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else{
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

function generate_introspection() {
  var topBlocks = workspace.getTopBlocks();
  var generated = [];
  for (var t = 0; t < topBlocks.length; t++) {
    if(topBlocks[t].type != "node_definition") {
      continue;
    }
    else {
      var nodePath = topBlocks[t].inputList[0].fieldRow[1].value_;
      nodePath = nodePath.substr(1,nodePath.length);
      nodePath = nodePath.replace(/\//g,"_");
      var fileName = nodePath + ".xml";
      generated.push({ "filename": fileName, "contents":introspectionPreamble + Blockly.DBusIntrospection["node_definition"](topBlocks[t]) });
      //outputDiv.innerHTML = introspectionPreamble + Blockly.DBusIntrospection["node_definition"](topBlocks[t]);
    }
  }
  
  for(var i = 0; i < generated.length; i++) {
    saveTextFile(generated[i].filename, generated[i].contents);
  }
  
}
