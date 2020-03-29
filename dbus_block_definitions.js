Blockly.Blocks['node_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Node")
        .appendField(new Blockly.FieldTextInput("/com/example/MyNode"), "node_path");
    this.appendStatementInput("interface_list")
        .setCheck("interface_definition");
    this.appendDummyInput()
        .appendField("Children");
    this.appendStatementInput("child_nodes")
        .setCheck("node_definition")
        .setAlign(Blockly.ALIGN_CENTRE);
    this.setPreviousStatement(true, "node_definition");
    this.setNextStatement(true, "node_definition");
    this.setColour(230);
 this.setTooltip("Defines a node.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['interface_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Interface:")
        .appendField(new Blockly.FieldTextInput("com.example.interface.MyInterface"), "interfaceName");
    this.appendStatementInput("methods")
        .setCheck("method_definition")
        .appendField("Methods:");
    this.appendStatementInput("properties")
        .setCheck("property_definition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Properties:");
    this.appendStatementInput("signals")
        .setCheck("signal_definition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Signals:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "interface_definition");
    this.setNextStatement(true, "interface_definition");
    this.setColour(0);
 this.setTooltip("Defines an Interface.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['method_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Method")
        .appendField(new Blockly.FieldTextInput("exampleMethod"), "method_name");
    this.appendStatementInput("inputs")
        .setCheck("named_arg")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Inputs");
    this.appendStatementInput("returns")
        .setCheck("named_arg")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Returns");
    this.setPreviousStatement(true, "method_definition");
    this.setNextStatement(true, "method_definition");
    this.setColour(330);
 this.setTooltip("Defines a method in an interface");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['property_definition'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(new Blockly.FieldTextInput("exampleProperty"), "property_name");
    this.appendValueInput("type")
        .setCheck("type_definition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Type:");
    this.appendDummyInput()
        .appendField("Access:")
        .appendField(new Blockly.FieldDropdown([["Read","read"], ["Read & Write","readwrite"], ["Write","write"]]), "access");
    this.setInputsInline(false);
    this.setPreviousStatement(true, "property_definition");
    this.setNextStatement(true, "property_definition");
    this.setColour(65);
 this.setTooltip("Defines a property of an interface.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['signal_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("ExampleSignal"), "signal_name");
    this.appendStatementInput("argument_types")
        .setCheck("named_arg")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Data Arguments:");
    this.setPreviousStatement(true, "signal_definition");
    this.setNextStatement(true, "signal_definition");
    this.setColour(290);
 this.setTooltip("Defines a signal that this interface can emit.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['named_arg'] = {
  init: function() {
    this.appendValueInput("arg_type")
        .setCheck("type_definition")
        .appendField(new Blockly.FieldTextInput("argName"), "arg_name");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
 this.setTooltip("Defines a returned or input argument.");
 this.setPreviousStatement(true, "named_arg");
    this.setNextStatement(true, "named_arg");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['byte_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("byte");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A return type of a byte/8-bit unsigned integer");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['boolean_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("boolean");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A boolean return type");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['int16_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("signed int16");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A 16bit signed integer return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['uint16_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("unsigned int16");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("An unsigned 16 bin integer return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['int32_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("signed int32");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A signed 32 bit integer return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['uint32_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("unsigned int32");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("An unsigned 32 bit integer return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['double_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("double");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A IEEE 754 double return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['int64_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("signed int64");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A 64 bit signed integer return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['uint64_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("unsigned int64");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("An unsigned 64 bit integer return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['string_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("string");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A UTF-8 string return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['object_path_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("object instance path");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("An object instance path return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['type_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("type");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A type return type. ");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['unix_fd_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("UNIX file descriptor");
    this.setOutput(true, ["type_definition", "basic_type"]);
    this.setColour(20);
 this.setTooltip("A UNIX file descriptor return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['variant_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("variant");
    this.setOutput(true, ["type_definition", "container_type"]);
    this.setColour(20);
 this.setTooltip("A variant return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['array_type_container'] = {
  init: function() {
    this.appendValueInput("child_type")
        .setCheck("type_definition")
        .appendField("Array of");
    this.setInputsInline(false);
    this.setOutput(true, ["type_definition", "container_type", "array_type_container"]);
    this.setColour(20);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['struct_type'] = {
  init: function() {
    this.appendStatementInput("members")
        .setCheck("struct_member")
        .appendField("struct");
    this.setInputsInline(false);
    this.setOutput(true, ["type_definition", "container_type", "struct_type"]);
    this.setColour(20);
 this.setTooltip("Defines a struct return type.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['struct_member'] = {
  init: function() {
    this.appendValueInput("member_type")
        .setCheck("type_definition")
        .appendField("struct field:");
    this.setPreviousStatement(true, "struct_member");
    this.setNextStatement(true, "struct_member");
    this.setColour(20);
 this.setTooltip("Used to define members of a struct.");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['dictionary_type'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Dictionary");
    this.appendValueInput("key_type")
        .setCheck("basic_type")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Key:");
    this.appendValueInput("value_type")
        .setCheck("type_definition")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value:");
    this.setOutput(true, ["type_definition", "container_type", "dictionary_type"]);
    this.setColour(20);
 this.setTooltip("A dictionary return type. NOTE: Automatically appends the 'a' before the {}");
 this.setHelpUrl("");
  }
};