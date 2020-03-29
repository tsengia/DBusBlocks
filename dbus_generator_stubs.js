var INDENT_LEVEL = 0;

function getIndents() {
  var t = "";
  for(var i = 0; i < INDENT_LEVEL; i++) {
    t += "\t";
  }
  return t;
}

Blockly.DBusIntrospection['node_definition'] = function(block) {
  var node_path = block.getFieldValue('node_path');
  var code = getIndents() + '<node path="' + node_path + '" >\n';
  
  var interfaceCode = "";
  INDENT_LEVEL++;
  if (block.getInput("interface_list").connection.isConnected()) {
    var currentIface = block.getInput("interface_list").connection.targetBlock();
    
    interfaceCode += Blockly.DBusIntrospection["interface_definition"](currentIface);
    while(currentIface.nextConnection.isConnected()) {
      currentIface = currentIface.nextConnection.targetBlock();
      interfaceCode += Blockly.DBusIntrospection["interface_definition"](currentIface);
    }
  }
  
  var childNodeCode = "";
  if (block.getInput("child_nodes").connection.isConnected()) {
    var currentNode = block.getInput("child_nodes").connection.targetBlock();
    
    childNodeCode += Blockly.DBusIntrospection["node_definition"](currentNode);
    while(currentNode.nextConnection.isConnected()) {
      currentNode = currentNode.nextConnection.targetBlock();
      childNodeCode += Blockly.DBusIntrospection["node_definition"](currentNode);
    }
  }
  INDENT_LEVEL--;
  
  code += interfaceCode + childNodeCode + getIndents() + "</node>\n";
  return code;
};

Blockly.DBusIntrospection['interface_definition'] = function(block) {
  var interface_name = block.getFieldValue('interfaceName');
  var code = getIndents() + '<interface name="' + interface_name + '" >\n';

  INDENT_LEVEL++;
  var methodCode = "";
  if (block.getInput("methods").connection.isConnected()) {
    var currentMethod = block.getInput("methods").connection.targetBlock();
    
    methodCode += Blockly.DBusIntrospection["method_definition"](currentMethod);
    while(currentMethod.nextConnection.isConnected()) {
      currentMethod = currentMethod.nextConnection.targetBlock();
      methodCode += Blockly.DBusIntrospection["method_definition"](currentMethod);
    }
  }
  
  var propertyCode = "";
  if (block.getInput("properties").connection.isConnected()) {
    var currentProperty = block.getInput("properties").connection.targetBlock();
    
    propertyCode += Blockly.DBusIntrospection["property_definition"](currentProperty);
    while(currentProperty.nextConnection.isConnected()) {
      currentProperty = currentProperty.nextConnection.targetBlock();
      propertyCode += Blockly.DBusIntrospection["property_definition"](currentProperty);
    }
  }
  
  var signalCode = "";
  if (block.getInput("signals").connection.isConnected()) {
    var currentSignal = block.getInput("signals").connection.targetBlock();
    
    signalCode += Blockly.DBusIntrospection["signal_definition"](currentSignal);
    while(currentSignal.nextConnection.isConnected()) {
      currentSignal = currentSignal.nextConnection.targetBlock();
      signalCode += Blockly.DBusIntrospection["signal_definition"](currentSignal);
    }
  }
  INDENT_LEVEL--;
  
  code += methodCode + propertyCode + signalCode + getIndents() + "</interface>\n";
  return code;
};

Blockly.DBusIntrospection['method_definition'] = function(block) {
  var method_name = block.getFieldValue('method_name');
  var code = getIndents() + '<method name="' + method_name + '" >\n';
  
  INDENT_LEVEL++;
  var inputCode = "";
  if (block.getInput("inputs").connection.isConnected()) {
    var currentArg = block.getInput("inputs").connection.targetBlock();
    
    inputCode += Blockly.DBusIntrospection["named_arg"](currentArg,"in");
    while(currentArg.nextConnection.isConnected()) {
      currentArg = currentArg.nextConnection.targetBlock();
      inputCode += Blockly.DBusIntrospection["named_arg"](currentArg,"in");
    }
  }
  
  var returnCode = "";
  if (block.getInput("returns").connection.isConnected()) {
    var currentArg = block.getInput("returns").connection.targetBlock();
    
    returnCode += Blockly.DBusIntrospection["named_arg"](currentArg,"out");
    while(currentArg.nextConnection.isConnected()) {
      currentArg = currentArg.nextConnection.targetBlock();
      returnCode += Blockly.DBusIntrospection["named_arg"](currentArg,"out");
    }
  }
  INDENT_LEVEL--;
  
  code += inputCode + returnCode + getIndents() + '</method>\n';
  return code;
};

Blockly.DBusIntrospection['property_definition'] = function(block) {
  var property_name = block.getFieldValue('property_name');

  var access = block.getFieldValue('access');
  
  var type_signature = "UNKNOWN";
  if(block.getInput("type").connection.isConnected()) {
    var typeBlock = block.getInput("type").connection.targetBlock();
    type_signature = Blockly.DBusIntrospection[typeBlock.type](typeBlock);
  }
  
  var code = getIndents() + '<property name="' + property_name + '" type="' + type_signature + '" access="' + access + '" />\n';
  return code;
};

Blockly.DBusIntrospection['signal_definition'] = function(block) {
  var signal_name = block.getFieldValue('signal_name');
  var code = getIndents() + '<signal name="' + signal_name + '" >\n';
  
  INDENT_LEVEL++;
  var argCode = "";
  if (block.getInput("argument_types").connection.isConnected()) {
    var currentArg = block.getInput("argument_types").connection.targetBlock();
    
    argCode += Blockly.DBusIntrospection["named_arg"](currentArg,"");
    while(currentArg.nextConnection.isConnected()) {
      currentArg = currentArg.nextConnection.targetBlock();
      argCode += Blockly.DBusIntrospection["named_arg"](currentArg,"");
    }
  }
  INDENT_LEVEL--;
  
  code += argCode + getIndents() + '</signal>\n';
  return code;
};

Blockly.DBusIntrospection['named_arg'] = function(block, direction) {
  var arg_name = block.getFieldValue('arg_name');

  var type_signature = "UNKNOWN";
  if(block.getInput("arg_type").connection.isConnected()) {
    var typeBlock = block.getInput("arg_type").connection.targetBlock();
    type_signature = Blockly.DBusIntrospection[typeBlock.type](typeBlock);
  }
  
  if(direction != "") {
    return getIndents() + '<arg name="' + arg_name + '" type="' + type_signature + '" direction="' + direction + '" />\n';
  }
  else {
    return getIndents() + '<arg name="' + arg_name + '" type="' + type_signature + '" />\n';
  }
};

Blockly.DBusIntrospection['byte_type'] = function(block) {
  return "y";
};

Blockly.DBusIntrospection['boolean_type'] = function(block) {
  return "b";
};

Blockly.DBusIntrospection['int16_type'] = function(block) {
  return "n";
};

Blockly.DBusIntrospection['uint16_type'] = function(block) {
  return "q";
};

Blockly.DBusIntrospection['int32_type'] = function(block) {
  return "i";
};

Blockly.DBusIntrospection['uint32_type'] = function(block) {
  return "u";
};

Blockly.DBusIntrospection['double_type'] = function(block) {
  return "d";
};

Blockly.DBusIntrospection['int64_type'] = function(block) {
  return "x";
};

Blockly.DBusIntrospection['uint64_type'] = function(block) {
  return "t";
};

Blockly.DBusIntrospection['string_type'] = function(block) {
  return "s";
};

Blockly.DBusIntrospection['variant_type'] = function(block) {
  return "v";
};

Blockly.DBusIntrospection['object_path_type'] = function(block) {
  return "o";
};

Blockly.DBusIntrospection['type_type'] = function(block) {
  return "g";
};

Blockly.DBusIntrospection['unix_fd_type'] = function(block) {
  return "h";
};

Blockly.DBusIntrospection['array_type_container'] = function(block) {
  var type_signature = "aUNKNOWN";
  if(block.getInput("child_type").connection.isConnected()) {
    var typeBlock = block.getInput("child_type").connection.targetBlock();
    type_signature = "a" + Blockly.DBusIntrospection[typeBlock.type](typeBlock);
  }
  return type_signature;
};

Blockly.DBusIntrospection['struct_type'] = function(block) {
  var memberCode = "";
  if (block.getInput("members").connection.isConnected()) {
    var currentMember = block.getInput("members").connection.targetBlock();
    
    memberCode += Blockly.DBusIntrospection["struct_member"](currentMember);
    while(currentMember.nextConnection.isConnected()) {
      currentMember= currentMember.nextConnection.targetBlock();
      memberCode += Blockly.DBusIntrospection["struct_member"](currentMember);
    }
  }
  
  return "(" + memberCode + ")";
};

Blockly.DBusIntrospection['struct_member'] = function(block) {
  var type_signature = "UNKNOWN";
  if(block.getInput("member_type").connection.isConnected()) {
    var typeBlock = block.getInput("member_type").connection.targetBlock();
    type_signature = Blockly.DBusIntrospection[typeBlock.type](typeBlock);
  }
  return type_signature;
};

Blockly.DBusIntrospection['dictionary_type'] = function(block) {

  var key_type = "UNKNOWN";
  if(block.getInput("key_type").connection.isConnected()) {
    var typeBlock = block.getInput("key_type").connection.targetBlock();
    key_type = Blockly.DBusIntrospection[typeBlock.type](typeBlock);
  }
  
  var value_type = "UNKNOWN";
  if(block.getInput("value_type").connection.isConnected()) {
    var typeBlock = block.getInput("value_type").connection.targetBlock();
    value_type = Blockly.DBusIntrospection[typeBlock.type](typeBlock);
  }
  
  return "a{" + key_type + value_type + "}";
}