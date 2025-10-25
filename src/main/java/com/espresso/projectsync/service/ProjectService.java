package com.espresso.projectsync.service;

import com.espresso.projectsync.model.Project;

import java.util.Optional;

public interface ProjectService {
    Project updateProject(Long id, Project projectDetails);
    void deleteProject(Long id);
}
