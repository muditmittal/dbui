---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# **Motion Actuation**

Understanding SC 2.6.1

## In brief

**Goal** — Content is not dependent on a user's ability to move a device.

**What to do** — Don't rely solely on device motion to control page content.

**Why it's important** — Some people cannot hold or move a device steadily.

## Intent of this Success Criterion

The intent of this success criterion is to ensure that functions triggered by moving a device (for example, shaking or tilting) or by gesturing towards the device (so that sensors like a camera can pick up and interpret the gesturing), can also be operated by more conventional user interface components.

This criterion concerns content that interprets motion such as explicit eye, face, or hand gestures to a camera, or tilting and shaking a device, as an input. It does not cover the movement of users through space as registered by geolocation sensors or beacons, the movement necessary to point a device camera at a particular object (such as a QR code, a document, or an image for the purpose of recognizing it), or events observed by the device other than intentional input gestures and movements by the user. The "Supported Interface" exception directly exempts incidental user motion – such as the movement necessary to type on/operate a keyboard, move/click a mouse, the hand and finger movements used to operate a touchscreen, or any movement necessary to operate assistive technology.

Devices often have sensors that can act as inputs, such as accelerometer and gyroscope sensors on a phone or tablet device. These sensors can allow the user to control something by simply changing the orientation or moving the device in particular ways. In other situations, web content can interpret user gestures via the camera or other sensors to actuate functions. For example, shaking the device might issue an "Undo" command, or a gentle hand wave might be used to move forward or backward in a sequence of pages. Some users with disabilities are not able to operate these device sensors (either not at all, or not precisely enough) because the device is on a fixed mount (perhaps a wheelchair) or due to motor impairments. Therefore, functionality offered through motion must also be available by another mechanism.

In addition, some users may accidentally activate sensors due to tremors or other motor impairments. The user must have the ability to turn off motion actuation to prevent such accidental triggering of functions. Applications may be able to meet this requirement by supporting operating system settings which allow the user to disable motion detection at the system level.

There is an exception where motion is essential for the function or not using motions or gestures would invalidate the activity. Some applications are specifically created to use device sensor data. Examples of content that are exempt from this requirement include a pedometer that relies on device motion to count steps.

## Benefits

- This success criterion helps people who may be unable to perform particular motions (such as tilting, shaking, or gesturing) because the device may be mounted or users may be physically unable to perform the necessary movement. This success criterion ensures that users can still operate all functionality by other means such as touch or via assistive technologies.

- Other users will benefit in situations where they are unable to move their devices.

## Examples of Success Criterion 2.6.1

- A user can choose an application setting which turns off Shake to Undo and other motion-activated features.

- After text is input in a field, shaking a device shows a dialog offering users to undo the input. A cancel button next to the text field offers the same functionality.

- A user can tilt a device to advance to the next or a previous page. Buttons are also provided to perform the same function.

- A user can move or pan a device to change the view in an interactive photo. A control is also available to perform these same functions.

- A user can gesture towards the device to navigate content. Controls are also available to navigate.

## Related Resources

- [Detecting device orientation](https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation)

- [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
