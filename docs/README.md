---
layout: home
permalink: index.html

# Please update this with your repository name and project title
repository-name: e18-3yp-Smart-Compost-Management-System
title: Smart Compost Management System
---

[comment]: # "This is the standard layout for the project, but you can clean this and use your own template"

# Smart Compost Management System
![interface](./images/interface1.jpg)
![interface](./images/interface2.jpg)
---

## Team
-  E/18/077, Dharmarathna N.S., [e18077@eng.pdn.ac.lk](mailto:name@email.com)
-  E/18/224, Mihiranga G.D.R., [e18224@eng.pdn.ac.lk](mailto:name@email.com)
-  E/18/227, Mudalige D.H., [e18227@eng.pdn.ac.lk](mailto:name@email.com)

<!-- Image (photo/drawing of the final hardware) should be here -->

<!-- This is a sample image, to show how to add images to your page. To learn more options, please refer [this](https://projects.ce.pdn.ac.lk/docs/faq/how-to-add-an-image/) -->

<!-- ![Sample Image](./images/sample.png) -->

#### Table of Contents
1. [Introduction](#introduction)
2. [Problem Definition](#problem-definition)
3. [Solution Architecture](#solution-architecture )
4. [Hardware & Software Designs](#hardware-and-software-designs)
5. [Testing](#testing)
6. [Estimated budget](#estimated-budget)
7. [Conclusion](#conclusion)
8. [Links](#links)

---
## Introduction

The smart compost management system is capable of monitoring and managing compost mixtures by adding air and water and other essentials when needed. 

Usually when making compost in household we dump kitchen scraps & leaves into a bin & we let it be converted to compost by keeping it for a long time. This process is called anaerobic composting. And there are few problems in this method. They are, it will take years to happen, anaerobic composting causes a higher output of methane gas, attracts rodents, and emits hydrogen sulfide and cadaverine. 

Currently it’s hard to find a proper solution for this problem in the local market. Our solution for this matter is aerobic composting. This method uses oxygen to feed the microorganisms that break down the compost. From this method usable compost can be created within a month if the essential requirements were given. And this method won’t create methane. We can measure the temperature, moisture, methane gas output of the compost mixture and these readings can be displayed through a web and mobile interface. Our system will recognize whether the compost mixture has been made or not by using the sensors and it will let us know when the compost is ready. According to the measured readings we can add water and control the air vents of our compost bin automatically.

---
## Problem Definition
General process, which is called anaerobic composting, can take years<br>
Anaerobic composting causes a higher output of methane gas, attracts rodents, and emits hydrogen sulfide and cadaverine<br>

---
## Introduction to Solution
Aerobic composting: A Better Way to Compost(Involves aerating the compost, Adding materials to maintain heat/pH, Watering the compost as needed)<br>
Methane gas is not created<br>
Usable compost can be created in as little as four weeks<br>
Can be implemented in small space(Household level solution)<br>

---
## Our Product
---
![interface](./images/simple_design.png)

---
## Big Picture
---
![interface](./images/big_picture.jpg)

## Embedded Circuit
---
![interface](./images/embedded_circuit.png)



---
## Solution Architecture
---
![interface](./images/solution.png)

## Control Flow
---
![interface](./images/control_flow.png)

### Technology Stack
- Web application: Jekyll (HTML, CSS, JavaScript and Bootstrap)
- Data structure: JSON
- Data processing: Python Scripts
- Databases: Firebase, SQLite
- Web and Mobile interface designing: Figma
- Version control and documentation: GitHub

---
### Generation of Data
Compost temperature --> Methane gas output<br>
Temperature sensor  --> Methane gas sensor<br>
Compost moisture    --> Water level<br>
Moisture sensor     --> Water level float sensor<br>

---
## Hardware and Software Designs

![hs](./images/hs.png)

---
## Demonstration Plan

![prototype](./images/prototype_design.png)

---
## Estimated budget

![Estimated budget](./images/estimated_budget.png)
---

## Project Timeline
![timeline](./images/timeline.png)

---
## Links

- [Project Repository](https://github.com/cepdnaclk/e18-3yp-Smart-Compost-Management-System)
- [Project Page](https://cepdnaclk.github.io/e18-3yp-Smart-Compost-Management-System/)
- [Department of Computer Engineering](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)

[//]: # (Please refer this to learn more about Markdown syntax)
[//]: # (https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
