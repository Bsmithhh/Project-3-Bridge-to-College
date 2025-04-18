<<<<<<< HEAD
Frontend Components
1. Dashboard.js

    What It Does:
    This is the main screen of the TruthBot Dashboard. It gathers the list of flagged interactions from the backend and displays them along with summary statistics and filter options.

    How It Works:
    It uses React’s state hooks to keep track of:

        Interactions: The list of data entries to be reviewed.

        Filters: Options to narrow down what data is shown (e.g., by status, type of flag, or date range).
        When filters change, the component automatically refetches the updated interaction data from an API endpoint.

    Why This Approach:
    Organizing the dashboard this way keeps the logic centralized (data fetching and managing filters) and allows you to easily add or change parts of the UI by updating the smaller components (like the filter panel and interaction list).

2. InteractionCard.js

    What It Does:
    This component displays detailed information about a single student-college interaction. It shows basic details (student ID, college name, timestamp), a list of potential issues (flags), and additional details that can be toggled visible (like academic profile, fit scores, and review notes).

    How It Works:

        It starts out by showing the most important info and a list of color-coded flags.

        When you click “Show More,” it reveals extra details, making it easy for a reviewer to see everything they need.

        It also provides the ability to update the review status and add notes by sending a small update (PATCH) request back to the server.

    Why This Approach:
    Using an expandable card design keeps the interface clean and uncluttered. The color coding for flags makes it easy to spot issues, and the inline editing of review notes helps streamline the review process without needing to navigate away from the card.

3. InteractionList.js

    What It Does:
    This is essentially a wrapper component that takes the list of interactions and renders each one using the InteractionCard component.

    How It Works:
    It loops over the interaction data and creates an individual card for each entry, ensuring the layout remains clean and organized.

    Why This Approach:
    Splitting the list display into its own component simplifies the Dashboard’s structure. It keeps the code modular, which makes it easier to maintain and update if needed.

4. Dashboard.css

    What It Does:
    This CSS file contains all the styling rules for the dashboard and its components.

    How It Works:

        It defines the layout of the dashboard (such as grid display for content and spacing).

        It styles individual elements like the interaction cards, buttons, flags, and text fields.

    Why This Approach:
    Separating the styles from the JavaScript components keeps the codebase clean and ensures a consistent look and feel across the application. It also makes future design updates easier to handle.

Backend Components
5. college.js

    What It Does:
    This file defines a database schema for colleges. It sets out the structure and types of data that each college record should have.

    How It Works:
    Using Mongoose (a MongoDB object modeling tool for Node.js), it defines fields such as:

        Basic information (name, state, type)

        Demographics (racial/ethnic breakdown)

        Academics (GPA, SAT scores, etc.)

        Admissions and costs

    Why This Approach:
    A well-structured schema ensures that college data is consistent and easy to query. It supports the need to match student information against college requirements and provides detailed reference data for enriching interaction records.

6. interaction.js

    What It Does:
    This file defines a schema for student-college interactions (or review cases). It sets up the structure for how each interaction is stored in the database.

    How It Works:
    The schema includes fields such as:

        Timestamps and student identifiers

        The college being reviewed, and the student’s major interest

        Academic data and various "flags" to indicate potential issues (like financial concern, major mismatch, etc.)

        Fit scores for academic, social, and financial aspects

        Review status and notes

    Why This Approach:
    The detailed schema enables the system to capture all necessary information for a thorough review process. It supports automatic flagging of potential concerns and helps drive data-based decision-making during review.

7. interactions.js

    What It Does:
    This is the server-side routing file that handles API requests related to interactions. It serves several main purposes:

        Fetching all flagged interactions.

        Enriching interactions by looking up additional college data.

        Generating override statistics for review purposes.

        Allowing updates to interaction status and notes.

    How It Works:
    It defines different HTTP endpoints:

        A GET endpoint that retrieves interactions with flags and appends related college information.

        Another GET endpoint that aggregates statistics for cases of “calculus override.”

        A PATCH endpoint to update the status or review notes of a specific interaction.

    Why This Approach:
    By keeping the API routes modular, it allows the frontend to communicate efficiently with the database. This structure helps maintain clarity and separation of concerns, making the code easier to debug and extend.

8. app.js

    What It Does:
    This is the entry point of the backend server. It sets up the Express server and connects to the MongoDB database.

    How It Works:

        It establishes a connection to the database using Mongoose.

        It sets up middleware to parse JSON data.

        It defines a base URL (/api/interactions) for all interaction-related API calls.

        Finally, it starts the server on a specified port.

    Why This Approach:
    Keeping the server configuration in one file makes it easier to manage and deploy the backend. It’s a standard practice that helps ensure the API and database are correctly set up before handling any user requests.
=======
# TruthBot Dashboard System
## Overview

This system provides an automated dashboard for monitoring and analyzing TruthBot's college recommendation interactions, with a particular focus on tracking override decisions and fit assessments. The system replaces the current manual process of downloading and reviewing DynamoDB tables.

## Core Components

### 1. Data Models

#### College Model (`src/server/models/College.js`)
The College schema is carefully structured to match the comprehensive dataset from the college database CSV, including:

- **Basic Info**: Name, type, state
- **Demographics**: Detailed ethnic/racial breakdown percentages
- **Academics**: GPA, SAT/ACT scores, graduation rates
- **Requirements**: Course requirements broken down by subject
- **Admissions**: Application statistics and deadlines
- **Costs**: Financial details including debt metrics

This structure allows for:
- Easy querying of college-specific requirements
- Comparison of student profiles against college standards
- Analysis of demographic and financial fit

#### Interaction Model (`src/server/models/Interaction.js`)
The Interaction schema tracks each TruthBot conversation, with fields designed to capture:

- **Student Info**: ID and timestamp
- **College Context**: College name and major interest
- **Academic Profile**: 
  - Traditional metrics (GPA, SAT/ACT)
  - Course history
  - Strength indicators (particularly for override decisions)
- **Flags**: Various types of potential mismatches or concerns
  - `calculus_override`: For tracking alternative math readiness indicators
  - `major_mismatch`: When program requirements don't align
  - `financial_concern`: Affordability issues
  - `demographic_mismatch`: Potential cultural fit concerns
  - `location_concern`: Geographic considerations
  - `deeper_needs`: For cases requiring additional support
- **Fit Scores**: Academic, social, and financial fit metrics
- **Review Status**: Tracking the review process

### 2. API Routes (`src/server/routes/interactions.js`)

The routes are designed for efficient data retrieval and analysis:

- **GET /flagged**: 
  - Retrieves flagged interactions
  - Enriches each interaction with relevant college data
  - Enables comprehensive review of each case

- **GET /override-stats**:
  - Aggregates statistics on override decisions
  - Tracks success rates of overrides
  - Helps validate override criteria

- **PATCH /:id**:
  - Updates interaction status and notes
  - Maintains audit trail of reviews
  - Supports collaborative review process

### 3. Frontend Components

#### InteractionCard (`src/client/components/InteractionCard.js`)
A sophisticated card component that:

- **Displays Key Information**:
  - Student ID
  - College name
  - Timestamp
  - Color-coded flags for quick visual scanning
  
- **Expandable Details**:
  - Academic profile
  - Fit scores
  - Review notes
  
- **Interactive Elements**:
  - Status updates
  - Note taking
  - Expand/collapse functionality

#### Styling (`src/client/styles/Dashboard.css`)
Carefully crafted styles that:

- Use a clean, professional color scheme
- Implement consistent spacing and typography
- Ensure good visual hierarchy
- Maintain responsive design principles
- Use subtle shadows and borders for depth
- Include hover states for interactive elements

## Design Decisions

1. **Separation of College and Interaction Data**
   - Keeps college data normalized and easily updateable
   - Allows for efficient querying of college-specific information
   - Reduces data redundancy

2. **Expanded Flag Types**
   - Based on analysis of common override scenarios
   - Covers both academic and non-academic concerns
   - Allows for more nuanced tracking of issues

3. **Strength Indicators in Academic Profile**
   - Specifically designed for override decisions
   - Tracks alternative success predictors
   - Supports data-driven override decisions

4. **Color-Coded Flag System**
   - Improves visual scanning efficiency
   - Uses intuitive color associations
   - Helps prioritize review items

5. **Expandable Card Design**
   - Reduces initial cognitive load
   - Provides easy access to details when needed
   - Improves overall dashboard usability

## Future Enhancements

1. **Analytics Dashboard**
   - Track override success rates
   - Monitor demographic trends
   - Analyze financial fit patterns

2. **Automated Alerts**
   - Flag unusual patterns
   - Highlight urgent cases
   - Notify relevant staff

3. **Batch Processing**
   - Handle multiple reviews
   - Bulk status updates
   - Mass export capabilities

4. **Integration Features**
   - Connect with student information systems
   - Link to college application platforms
   - Export to reporting tools

## Technical Requirements

- Node.js
- MongoDB
- React
- Express

## Security Considerations

- Role-based access control
- Secure data transmission
- Audit logging
- Data encryption
- Regular backups

## Performance Optimizations

- Indexed database queries
- Lazy loading of expanded content
- Efficient state management
- Optimized college data lookups
- Caching of frequently accessed data

This system represents a significant improvement over manual review processes, providing better tracking, analysis, and decision support for TruthBot's college recommendations. 
>>>>>>> 7cce314 (Loose mock up of task)
