# Storyo Project Documentation

## 1. System Request
**Project Name:** Storyo
**Project Sponsor:** Business Stakeholder / End Users
**Business Need:** There is a growing demand for creative writing assistance and automated, personalized storytelling. Users need an accessible platform to quickly generate stories with tailored parameters (genre, length, creativity level) to spark inspiration, read for entertainment, or assist in creative writing.
**Business Requirements:** 
- The system must capture user inputs including a story prompt and configuration settings (genre, text length, and creativity level).
- The system must interact seamlessly with an AI model (like GPT-4 or g4f) to turn the prompt into a structured story with a title and body.
- The system must provide functionality to save generated stories into a database (MongoDB) for long-term storage.
- The system must allow users to retrieve and view their previously generated stories.
**Business Value:** Provides an engaging platform that acts as a boundless source of inspiration, entertaining readers and assisting writers, leading to potential user retention and future monetization opportunities.

## 2. Feasibility Study
**Technical Feasibility:** 
- The required technologies (AI inference APIs like GPT-4, MongoDB for scalable document storage, and modern web frameworks for the UI) are mature, reliable, and well-understood. 
- The system architecture outlined in the DFD is standard for modern web applications. 
- Technical risk is low to moderate, mainly tied to AI response times and API rate limits.

**Economic Feasibility:** 
- Development requires standard full-stack engineering effort. 
- Operational costs cover database hosting and AI API usage. Utilizing models like `g4f` can initially offset high AI API costs.
- Expected benefits: High organic user engagement due to the popularity of AI generation tools, opening pathways for premium subscription tiers.

**Organizational/Operational Feasibility:** 
- The application is intuitively designed: users enter a prompt and receive a story.
- Requires no specialized training for the end-user.
- Aligns perfectly with current technological trends favoring AI-assisted creative tools.

## 3. Interview (Mock Requirements Gathering)
**Interviewer:** Systems Analyst
**Interviewee:** Project Lead

**Q: What is the core functionality you want to achieve with the Storyo app?**
A: We want to give users an effortless interface where they can generate custom stories. They provide a prompt and pick parameters like genre, length, and creativity, and the app handles the rest.

**Q: How do you plan to handle the story generation under the hood?**
A: The user's inputs are first processed to build a structured prompt, appending any genre-specific prefixes. This compiled prompt is then sent to our AI model (GPT-4 or a g4f equivalent). The AI returns raw story text which we format into a title and the main story body for display.

**Q: How is data storage managed?**
A: We're using MongoDB since the unstructured/semi-structured nature of stories fits well with NoSQL. Whenever a user wants to save a story, we grab the generated data plus their original prompt and settings, and insert it into a `stories` collection. Users can also retrieve their saved stories later.

**Q: Could you detail the main database entities?**
A: Sure. The main entity is the `STORY`, holding everything from title, the prompt, constraints, to the actual text. We also have `GENRE` to store different genre types and their specific prompt prefixes, and `PROMPT_EXAMPLE` to hold example texts tied to a genre.

## 4. Entity Relationship Diagram (ERD)

Based on the provided schema, here is the Entity Relationship Diagram representing the data objects.

```mermaid
erDiagram
    GENRE ||--o{ STORY : "belongs to"
    GENRE ||--o{ PROMPT_EXAMPLE : has

    STORY {
        ObjectId id PK
        string title
        string prompt
        string story
        string genre
        int length
        float creativity
        datetime created_at
    }

    GENRE {
        string id PK
        string name
        string prefix
    }

    PROMPT_EXAMPLE {
        string id PK
        string genre_id FK
        string text
    }
```

## 5. Data Flow Diagram (DFD)

### Level 0 — Context Diagram
This diagram depicts the Storyo system as a single process and illustrates its interactions with external entities.

```mermaid
flowchart LR
    User([User])
    Sys((Storyo system\n0))
    DB[(MongoDB)]
    AI[AI model\nGPT-4 / g4f]

    User -- "prompt + settings" --> Sys
    Sys -- "generated story" --> User
    
    Sys -- "save / fetch" --> DB
    
    Sys -- "structured prompt" --> AI
    AI -- "story text" --> Sys
```

### Level 1 — Process Decomposition
This diagram breaks down the main system into specific functional processes and outlines the flow of data between them.

```mermaid
flowchart TD
    User([User])
    P1((1. Build prompt\nApply genre prefix))
    P2((2. Generate story\nCall AI, parse title))
    P3((3. Display story\nRender title + body))
    P4((4. Save story\nPOST /save_story))
    P5((5. Retrieve stories\nGET /api/stories))
    DB[(D1 - MongoDB /\nstories collection)]
    AI[AI model\nGPT-4 / g4f]

    %% Data Flows
    User -- "inputs" --> P1
    P1 -- "structured prompt" --> P2
    P2 -- "prompt" --> AI
    AI -- "story text" --> P2
    
    P2 -- "title + story" --> P3
    P3 -. "story" .-> User
    
    User -. "save request" .-> P3
    P3 -- "story data" --> P4
    P4 -- "insert" --> DB
    
    User -. "view request" .-> P5
    P5 -- "stories list" --> P3
    DB -- "stories list" --> P5
    
    classDef default fill:#1f2937,stroke:#6366f1,stroke-width:2px,color:#fff;
    classDef external fill:#065f46,stroke:#34d399,stroke-width:2px,color:#fff;
    classDef database fill:#78350f,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef model fill:#7f1d1d,stroke:#f87171,stroke-width:2px,color:#fff;

    class User external
    class DB database
    class AI model
```
