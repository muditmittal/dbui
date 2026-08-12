---
source: carbon
title: IBM Carbon Design System
url: https://carbondesignsystem.com/elements/motion/
license: Apache-2.0
bucket: A
sha: 535b874844e1863a699cda006d7e18e6d2699880
retrieved: 2026-08-11
---
Paths
Composition

## Paths

Elements in Carbon dance on the grid. Motion paths trace lines along the grid
which never run diagonally.

<br />

<br />

## Composition

When multiple animated elements coexist or interact with each other within the
same view, it is vital to make the many moving elements work together and form a
coherent experience, to better provide way-finding and focus.

### Consistency

#### Semantic consistency

When elements convey the same meaning or perform the same function, use the same
motion for them, and vice-versa. This helps to reinforce the meaning behind a
movement and improves the user’s proficiency using the interface.

In the example below, both expanding a row of a data table and opening a
dropdown use a chevron and share a similar intent—to reveal content hidden in a
seam. Therefore, they should use the same motion style (productive) and easing
(entrance, standard). However, they should use slightly different durations due
to their difference in size.

#### Spatial consistency

Pay attention to the spatial relationships between elements and screens, and
information hierarchy. Visually similar elements may need the different motions
to clarify their respective spatial locations.

#### Intentional inconsistency

Conscientious use of inconsistency in motion highlights a difference in meaning
or intent behind actions with similar visual appearance. Usually, forward motion
in the direction of entrance signals affirmation, while reversing entrance
motion signals cancellation.

### Continuity

Motion can help establish a sense of continuity between screens and experiences.
Pay attention to shared elements across screens, such as title panels or
buttons, to create a graceful transition.

### Sequence and stagger

When multiple elements need to animate, distribute their entrances over time
instead of introducing everything at once. This will help the user understand
the content and orientation.

For example, staggering the entrance of table content by 20 ms significantly
reduces the cognitive load. Depending on the number of staggered elements, the
delay should be adjusted to ensure that total time is still within 500 ms.

Sequence the loading of page content when possible. Start with the most stable
content, such as static content and header, and end with the most important
information, such as the primary button or a calculation result, to focus the
user’s attention on them.

Follow this recommended sequence of different types of content when
choreographing content entrance. Not all categories will be present in every
experience.

| Seq | Category              | Examples                                             |
| --- | --------------------- | ---------------------------------------------------- |
| 1   | Static content        | UI shell, top and side navigation                    |
| 2   | Static content (body) | Headers, written content, images                     |
| 3   | Dynamic content       | Content of a data table, query results from database |
| 4   | Primary action        | Primary action button                                |
| 5   | Animated content      | Data visualizations                                  |
