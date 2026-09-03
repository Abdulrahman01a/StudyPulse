# StudyPulse

## Project Identity

### Project Name

StudyPulse

### Mission

Measure real study, not screen time.

### Vision

StudyPulse helps students understand how they actually study by measuring real active study time instead of simply measuring how long a webpage stays open.

### What StudyPulse IS

- A study analytics tool.
- A Chrome Extension.
- A real active study time tracker.
- A session-based study tracker.

### What StudyPulse is NOT

- A screen time tracker.
- A productivity blocker.
- A Pomodoro timer.
- A distraction blocker.
- A website blocker.

## Design Philosophy

- StudyPulse measures study activity, not general computer activity.
- Reading a question constitutes studying.
- Thinking before answering constitutes studying.
- Reading explanations constitutes studying.
- The extension shall measure meaningful study time rather than interaction frequency.
- Mouse movement and keyboard activity serve as indicators of study activity; they are not the measurement objective itself.
- The system objective is to estimate real study time with the highest possible accuracy.

## Core Requirements

### Scope

The extension shall operate exclusively on Coursology test pages.

### Active Study Time

- Active Study Time shall be the primary metric of the application.
- Active Study Time shall be displayed as the most prominent statistic presented to the user.

### Study Sessions

- Study sessions shall be detected automatically.
- A single day may contain multiple study sessions.
- Study sessions shall be grouped by date.
- Each study session shall store the following:
  - Start Time
  - End Time
  - Active Study Time
  - Number of Questions
  - Average Time per Question
  - Questions per Hour
- Subject shall be excluded from session information.

## Data Presentation Philosophy

### Primary Metric

- Today's Active Study Time shall be the application's most important metric.
- Today's Active Study Time shall be the primary focus of the interface.

### Session Organization

- Study sessions shall be displayed grouped by date.
- Recent days shall be displayed using natural labels such as "Today" and "Yesterday" before calendar dates are used.

### Session Identification

- Each study session shall be identified by its start and end time using the 24-hour clock (e.g., 08:15 – 09:49).
- Sequential session labels (e.g., "Session 1", "Session 2") and AM/PM formatting shall not be used.

### Session Display

Each study session shall display the following:

- Session Duration
- Active Study Time
- Number of Questions
- Average Time per Question
- Questions per Hour

### Daily Summary

Each daily summary shall display the following:

- Total Active Study Time
- Total Number of Sessions
- Total Number of Questions

## Scope Lock

- Version 1 shall have a fixed scope.
- No new features shall be added during Version 1 development except for bug fixes or architectural necessities.
- Future ideas shall be documented separately and deferred to later versions.
- The objective of Version 1 is to deliver a stable, complete, and reliable product rather than a feature-rich one.

## Software Architecture

The application shall consist of four major components.

### 1. Background

The Background component shall act as the central controller of the application.

It shall be responsible for coordinating application state.

It shall not inspect web page contents directly.

### 2. Content Script

The Content Script component shall act as the observer.

It shall be responsible solely for detecting events occurring within supported study pages, including:

- Mouse movement
- Mouse clicks
- Scrolling
- Keyboard activity
- Page changes

It shall not contain business logic or perform study calculations.

Its responsibility is limited to observing and reporting events.

### 3. Study Engine

The Study Engine component shall be responsible for all study-related logic, including:

- Active Study Time
- Session management
- Question counting
- Statistics calculation

This component represents the core logic of StudyPulse.

### 4. User Interface

The User Interface component shall be responsible solely for presenting information.

It shall not perform calculations or maintain application state.

## Study Engine Rules

### Active Study Time

Active Study Time begins with the first user interaction inside a supported Coursology test page.

Supported interactions include:

- Mouse movement
- Mouse clicks
- Scrolling
- Keyboard activity

If no interaction occurs for 120 consecutive seconds, Active Study Time pauses.

When interaction resumes, Active Study Time resumes immediately.

The inactive period is not included in Active Study Time.

### Study Sessions

A Study Session begins with the first Active Study interaction.

A Study Session does not end when Active Study pauses.

A Study Session ends only if the user does not return to studying for 45 consecutive minutes.

If the user returns within 45 minutes, the same session continues.

Opening another Coursology test within this period is considered part of the same session.

Pressing "End Test" does not immediately end the session.

## Question Model

A Question begins when it becomes the current active question.

A Question ends when the user finishes answering it.

Reading the explanation is considered part of the same question.

Question time therefore includes:

- Reading
- Thinking
- Answering
- Reading the explanation

The Number of Questions increases immediately after the question is completed.

## Statistics

Session Duration equals:

End Time − Start Time.

Average Time per Question equals:

Active Study Time divided by Number of Questions.

Questions per Hour equals:

Number of Questions divided by Active Study Time (in hours).
