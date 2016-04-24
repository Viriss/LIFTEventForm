var liftData = [];
var liftData_org = [];
var newIndex = -1;

var blankRow = {
    ID: -1,
    Section: "Top",
    Column: "Left",
    DisplayOrder: "",
    FieldName: "",
    Editable: true,
    Required: true,
    Label: "",
    FieldType: "TextBox",
    DefaultValue: "",
    CharLimit: "50",
    CSS: "",
    DisplayWidth: "60"
};

$(document).ready(function () {
    var row = {};

    row.ID = 1;
    row.Section = "Top";
    row.Column = "Left";
    row.DisplayOrder = 10;
    row.Editable = true;
    row.Required = true;
    row.FieldName = "field_name";
    row.Label = "test";
    row.FieldType = "TextBox";
    row.DefaultValue = "";
    row.CharLimit = "50";
    row.CSS = "";
    row.DisplayWidth = "120";
    
    liftData.push(row);

    liftData_org = JSON.parse(JSON.stringify(liftData));

    JS_BuildSection();

    $("#tblSectionTopLeft tbody").on("change", ":input", function () { JS_EditRow(this); });
});

function JS_BuildSection() {
    var result = "";
    var row;

    for(var i = 0; i < liftData.length; i++) 
    {
        row = liftData[i];
        if (row.Section == "Top" && row.Column == "Left")
        {
            result += JS_BuildRow(row);
        }
    }

    $("#tblSectionTopLeft tbody").empty();
    $("#tblSectionTopLeft tbody").append(result);
}

function JS_BuildRow(row) {
    var result = "";
    var rowClass = "";
    var isEdited = false;

    isEdited = JS_IsRowEdited(row.ID);

    rowClass = row.CSS;
    if (row.FieldType == "Section") { rowClass += " SectionHeader"; }
    if (row.ID < 0 || isEdited) { rowClass += " Edited"; }

    result += "<tr data-id='" + row.ID + "' class='" + rowClass + "'>";

    //editable
    result += "<td><input id='cbxEditable" + row.ID + "' type='checkbox' style='text-align: center;' " + (row.Editable ? "checked='checked' " : "") + " /></td>";

    //required
    result += "<td><input id='cbxRequired" + row.ID + "' type='checkbox' style='text-align: center;' " + (row.Required ? "checked='checked' " : "") + " /></td>";

    //display order
    result += "<td><input id='tbxDisplayOrder" + row.ID + "' type='text' style='text-align: center; width: 60px;' value='" + row.DisplayOrder + "' /></td>";

    //label
    result += "<td><input id='tbxLabel" + row.ID + "' type='text' style='width: 120px;' value='" + row.Label + "' /></td>";

    //field type
    result += "<td>";
    result += "<select id='ddlFieldType" + row.ID + "'><option></option>";
    result += "<option value='TextBox' " + (row.FieldType == "TextBox" ? "selected='selected' " : "") + ">TextBox</option>";
    result += "<option value='Numeric' " + (row.FieldType == "Numeric" ? "selected='selected' " : "") + ">Numeric</option>";
    result += "<option value='Phone' " + (row.FieldType == "Phone" ? "selected='selected' " : "") + ">Phone</option>";
    result += "<option value='eMail' " + (row.FieldType == "eMail" ? "selected='selected' " : "") + ">eMail</option>";
    result += "<option value='URL' " + (row.FieldType == "URL" ? "selected='selected' " : "") + ">URL</option>";
    result += "<option value='Section' " + (row.FieldType == "Section" ? "selected='selected' " : "") + ">Section</option>";
    result += "<option value='Label' " + (row.FieldType == "Label" ? "selected='selected' " : "") + ">Label</option>";
    result += "</td>";

    //field name
    result += "<td><input id='tbxFieldName" + row.ID + "' type='text' style='width: 120px;' value='" + row.FieldName + "' /></td>";

    //char. limit
    result += "<td><input id='tbxCharLimit" + row.ID + "' type='text' style='width: 60px; text-align: center;' value='" + row.CharLimit + "' /></td>";

    //default value
    result += "<td><input id='tbxDefault" + row.ID + "' type='text' style='width: 120px;' value='" + row.DefaultValue + "' /></td>";

    //field width
    result += "<td><input id='tbxWidth" + row.ID + "' type='text' style='width: 60px; text-align: center;' value='" + row.DisplayWidth + "' /></td>";

    //css
    result += "<td><input id='tbxCSS" + row.ID + "' type='text' style='width: 120px;' value='" + row.CSS + "' /></td>";

    //trash
    result += "<td><img src='images/trash.png' alt='' title='Delete field' onclick='JS_DeleteField(" + row.ID + ");' /></td>";

    result += "</tr>";

    return result;
}
function JS_AddNewField(Section, Column) {
    var row = JSON.parse(JSON.stringify(blankRow));

    row.ID = newIndex;
    newIndex -= 1;
    row.Section = Section;
    row.Column = Column;

    liftData.push(row);

    JS_BuildSection();

    JS_DoEditRow(row.ID);
}

function JS_EditRow(control) {
    var rowID = $(control).closest("tr").attr("data-id");
    JS_DoEditRow(rowID);
}
function JS_DoEditRow(index) {
    var row = JS_GetRowByID(index);
    var DisplayOrder = $("#tbxDisplayOrder" + index).val();
    var Label = $("#tbxLabel" + index).val();
    var FieldType = $("#ddlFieldType" + index).val();
    var DefaultValue = $("#tbxDefault" + index).val();
    var FieldName = $("#tbxFieldName" + index).val();
    var CSS = $("#tbxCSS" + index).val();
    var CharLimit = $("#tbxCharLimit" + index).val();
    var DisplayWidth = $("#tbxWidth" + index).val();
    var isEditable = $("#cbxEditable" + index).is(":checked");
    var isRequired = $("#cbxRequired" + index).is(":checked");

    row.DisplayOrder = DisplayOrder;
    row.Label = Label;
    row.FieldType = FieldType;
    row.CharLimit = CharLimit;
    row.CSS = CSS;
    row.FieldName = FieldName;
    row.Editable = isEditable;
    row.Required = isRequired;
    row.DisplayWidth = DisplayWidth;
    row.DefaultValue = DefaultValue;

    var isEdited = false;
    isEdited = JS_IsRowEdited(index);

    if (isEdited) {
        $("#tblSectionTopLeft tbody tr[data-id='" + index + "']").addClass("Edited");
    }
    else {
        $("#tblSectionTopLeft tbody tr[data-id='" + index + "']").removeClass("Edited");
    }


    isEdited = JS_AnyEdits();
    if (isEdited) {
        $("#btnSaveChanges").removeAttr("disabled");
    }
    else {
        $("#btnSaveChanges").attr("disabled", "disabled");
    }
}
function JS_GetRowByID(index) {
    for (var i = 0; i < liftData.length; i++) {
        if (liftData[i].ID == index) { return liftData[i]; }
    }
    return null;
}
function JS_GetOrgRowByID(index) {
    for (var i = 0; i < liftData_org.length; i++) {
        if (liftData_org[i].ID == index) { return liftData_org[i]; }
    }
    return null;
}
function JS_AnyEdits() {
    var result = false;
    for (var i = 0; i < liftData.length; i++) {
        if (JS_IsRowEdited(liftData[i].ID))
        {
            result = true;
            break;
        }
    }
    return result;
}
function JS_IsRowEdited(index) {
    var A = JS_GetRowByID(index);
    var B = JS_GetOrgRowByID(index);

    if (B == null) { return true; }

    if (A.CSS != B.CSS) { return true; }
    if (A.Label != B.Label) { return true; }
    if (A.DefaultValue != B.DefaultValue) { return true; }
    if (A.CharLimit != B.CharLimit) { return true; }
    if (A.DisplayWidth != B.DisplayWidth) { return true; }
    if (A.FieldName != B.FieldName) { return true; }
    if (A.FieldType != B.FieldType) { return true; }
    if (A.Editable != B.Editable) { return true; }
    if (A.Required != B.Required) { return true; }
    return false;
}

function JS_DeleteField(index) {
    for (var i = 0; i < liftData.length; i++) {
        if (liftData[i].ID == index) {
            liftData.splice(i, 1);
            break;
        }
    }
    JS_BuildSection();
}