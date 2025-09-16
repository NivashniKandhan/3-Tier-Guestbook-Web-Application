# GCP 3-Tier Web Application: Cloud Guestbook

This project demonstrates a classic 3-tier web application architecture deployed entirely on Google Cloud Platform. It's a simple "Guestbook" that allows users to post and view messages.

## Architecture

The application is separated into three distinct, decoupled tiers for scalability and security:

*   **Web Tier (Presentation):**
    *   **Technology:** Google Compute Engine (GCE) running Nginx.
    *   **Responsibility:** Serves the static HTML/CSS/JavaScript frontend to the user and acts as a reverse proxy, forwarding API requests to the application tier. It is the only layer exposed to the public internet.

*   **App Tier (Logic):**
    *   **Technology:** Google Compute Engine (GCE) running a Node.js and Express.js backend API.
    *   **Responsibility:** Handles all business logic. It processes requests from the web tier, interacts with the database, and returns data. It is not publicly accessible and only accepts traffic from the web tier.

*   **Data Tier (Database):**
    *   **Technology:** Google Cloud SQL (managed MySQL).
    *   **Responsibility:** Persists all application data. It is not publicly accessible and only accepts connections from the application tier via a private IP address.

### Network Configuration
*   **VPC:** A custom Virtual Private Cloud (`guestbook-vpc`) provides network isolation.
*   **Subnets:** The web and app tiers are in separate subnets (`web-subnet`, `app-subnet`) for network segmentation.
*   **Firewall Rules:** Strict firewall rules control traffic:
    *   HTTP (port 80) is allowed from the internet to the web tier.
    *   App traffic (port 8080) is allowed only from the web tier to the app tier.
    *   Database traffic (port 3306) is allowed only from the app tier.
    *   SSH is allowed from anywhere for management.

## How to Deploy

Link: http://34.31.153.0/

this is the link to view the website

---

This project showcases my ability to design, deploy, and manage secure, scalable, and resilient cloud-native applications.