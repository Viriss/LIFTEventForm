<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Editor.aspx.cs" Inherits="LIFTEventForm.Editor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <script src="jquery-2.2.3.min.js" type="text/javascript"></script>
    <script src="jquery-ui-1.11.4/jquery-ui.min.js" type="text/javascript"></script>
    <link href="jquery-ui-1.11.4/jquery-ui.min.css" rel="stylesheet" />
    <script src="Editor.js" type="text/javascript"></script>
    <link href="LIFTEventForm.css" rel="stylesheet" />
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <table id="tblSectionTopLeft" class="Editor">
            <thead>
                <tr>
                    <th><img src="images/editable.png" alt="" title="Will this this field be Editable?" /></th>
                    <th><img src="images/required.png" alt="" title="Is this a Required field?" /></th>
                    <th>Order</th>
                    <th>Label</th>
                    <th>Field Type</th>
                    <th>Field Name</th>
                    <th>Char.<br />Limit</th>
                    <th>Default Value</th>
                    <th>Field<br />Width</th>
                    <th>CSS</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        <input type="button" class="Button" value="Add New Field" onclick="JS_AddNewField('Top', 'Left');" />
        <br />
        <br />
        <br />
        <input id="btnSaveChanges" class="Button" type="button" value="Save Changes" disabled="disabled" />

    </div>
    </form>
</body>
</html>
