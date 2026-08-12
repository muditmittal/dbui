---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/community/patterns/export-pattern/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
#### Maintainers:

[Vikki Paterson](https://github.com/vikkipaterson),
[Chloe Poulter](https://github.com/chloepoulterdesign)

When **exporting** something you have the ability to change the format of the
object or resource you are exporting out external to the system.

**Downloading** transfers a resource from a remote system to a local system
without changing its format.

Most of this pattern is applicable to both exporting and downloading.

![Example of an export modal in context](images/0.png)

Example of an export modal

![Example of a download modal in context](images/download0.png)

Example of a download modal in the context of a product

Intuitive default name
Editable name
Optional extras
Accessibility

## Intuitive default name

When a resource is given an intuitive name by default and there is no choice of
an export or download location, the export occurs on the click of the Export
button and nothing additional is displayed.

![Example of an export button on a data table](images/1.png)



![Example of a download button](images/download1.png)

Example of a download button



## Editable name

When a file's name can be edited before exporting or downloading, a dialog
containing an editable textbox should be presented to the user. The textbox
should be pre-populated with the file's default name.

When downloading, the file extension is not displayed.

![Example of an export modal](images/2.png)

![Example of validation errors](images/newimage1.png)

Validate the edited name's extension.

![Example of an export modal in its "Exporting" state](images/3.png)

Example of an export modal in its "Exporting" state

## Optional extras

### Specify the export or download location

When specifying the download location of a resource, clicking the primary
“download” button activates the browser's default location panel. The file is
downloaded once a location is selected and the user clicks Save.

![Example of specifying an export location](images/newimage2.png)

### Choosing export format

When a file can be exported in 2-5 different formats, these can be presented in
a radio-button selection. Where possible, provide guidance about which format a
user might want to choose, and pre-select a sensible default.

![Example of specifying an export location](images/Format_Selection.png)

### Passive success modal

You can choose to show a passive modal when an export has succeeded.

![Example of a passive success modal](images/newimage3.png)

### Errors and failures

In the event of an error, display the error in the modal.

![Example of an error state modal](images/newimage4.png)

### Success notification

A notification can be used to alert the user that an export has been successful.

![Example of a success notification](images/newimage5.png)

## Accessibility

Adhere to
[Carbon's modal guidelines](https://www.carbondesignsystem.com/components/modal/accessibility).

### Trigger

Most often, the export modal is triggered by clicking an Export button.

1. The user navigates to the Export button using the `Tab` key. If Export is
   launched from an overflow menu, the user may navigate to Export within the
   overflow menu using the `Up` and `Down` arrow keys.
2. The focus state is applied to the button/menu item.
3. The user presses `Enter` to launch the Export modal.

### Focus

When the modal opens, focus is set depending on whether sensible default choices
are defined or not.

#### If the user must complete fields before the export can be executed:

1. On opening the modal, the focus is applied to the first field that accepts
   user input.
2. On `Tab`, progress through any further fields that accept user input.
3. On `Tab`, apply focus to Export.
4. On `Tab`, apply focus to Cancel.

#### If a sensible default value is provided:

1. On opening the modal, set the focus to the Export button.
2. On `Tab`, apply focus to Cancel.
3. On `Tab`, apply focus to the first field that accepts user input. Follow
   accessibility guidance for the interaction type of this field (for example
   [Radio button](https://www.carbondesignsystem.com/components/radio-button/accessibility#how-it-works)
   or
   [Text input](https://www.carbondesignsystem.com/components/text-input/accessibility#how-it-works))
4. On `Tab`, progress through any further fields that accept user input.

### Success & Failure modals

Where passive modals are used to alert the user of success or failure, open the
modal with focus applied to the close icon.
