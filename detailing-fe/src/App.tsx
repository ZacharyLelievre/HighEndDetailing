// src/App.tsx
import React from 'react';
import { motion } from 'framer-motion';
import './App.css';
import './img.png';
import ParticlesBackground from './ParticlesBackground'; // Import the ParticlesBackground component

interface User {
    name: string;
    title: string;
    bio: string;
    skills: string;
}

interface Project {
    title: string;
    description: string;
    technologies: string[];
}

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

const App: React.FC = () => {
    const [user, setUser] = React.useState<User | null>(null);
    const [projects] = React.useState<Project[]>([
        {
            title: "Car Detailing Management System",
            description: "Full-stack application for managing car detailing services",
            technologies: ["Spring Boot", "React", "MySQL"]
        },
        {
            title: "E-commerce Platform",
            description: "Microservices-based online shopping platform",
            technologies: ["Node.js", "TypeScript", "MongoDB"]
        }
    ]);
    const [error, setError] = React.useState<string | null>(null);

    // Fake Experience Data
    const experiences: Experience[] = [
        {
            company: "Tech Innovators Inc.",
            role: "Senior Software Engineer",
            duration: "Jan 2023 - Present",
            description: "Leading a team of developers in creating scalable web applications."
        },
        {
            company: "Creative Solutions LLC",
            role: "Frontend Developer",
            duration: "Jun 2020 - Dec 2022",
            description: "Developed responsive user interfaces with React and Redux."
        },
        {
            company: "Web Startups Co.",
            role: "Junior Developer",
            duration: "Jan 2018 - May 2020",
            description: "Assisted in building and maintaining company websites using HTML, CSS, and JavaScript."
        }
    ];

    React.useEffect(() => {
        fetch('http://localhost:8080/api/user')
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('User not found');
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data: User) => setUser(data))
            .catch(error => setError(error.message));
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, x: 0 },
        visibleLeft: { opacity: 1, x: -50 },
        visibleRight: { opacity: 1, x: 50 },
    };

    if (error) return <div className="error">{error}</div>;

    if (!user) return <div className="loading">Loading...</div>;

    return (
        <div className="portfolio">
            {/* Particle Background */}
            <ParticlesBackground />

            {/* Hero Section */}
            <motion.header
                className="hero section"
                initial="hidden"
                whileInView="visibleLeft"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                variants={fadeIn}
            >
                <div className="profile-image-container">
                    <img
                        src={require('./img.png')}
                        alt="Zachary Lelièvre"
                        className="profile-image"
                    />
                </div>
                <h1>{user.name}</h1>
                <h2>{user.title}</h2>
                <div className="skills">
                    {user.skills ? user.skills.split(',').map(skill => skill.trim()).join(' • ') : "No skills provided"}
                </div>
            </motion.header>

            {/* About Section */}
            <motion.section
                className="section about"
                initial="hidden"
                whileInView="visibleLeft"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                variants={fadeIn}
            >
                <h2>About Me</h2>
                <p className="bio">{user.bio}</p>
            </motion.section>

            {/* Projects Section */}
            <motion.section
                className="section projects"
                initial="hidden"
                whileInView="visibleLeft"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                variants={fadeIn}
            >
                <h2>Featured Projects</h2>
                <div className="project-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            initial="hidden"
                            whileInView="visibleLeft"
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            variants={fadeIn}
                        >
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="tech-stack">
                                {project.technologies.map((tech, i) => (
                                    <span key={i} className="tech">{tech}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Experience Timeline Section */}
            <motion.section
                className="section timeline"
                initial="hidden"
                whileInView="visibleLeft"
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                variants={fadeIn}
            >
                <h2>Experience Timeline</h2>
                <div className="timeline-container">
                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
                            >
                                <div className="timeline-dot"></div>
                                <motion.div
                                    className="timeline-content"
                                    initial="hidden"
                                    whileInView={isLeft ? "visibleLeft" : "visibleRight"}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    variants={fadeIn}
                                >
                                    <h3>{exp.role} at {exp.company}</h3>
                                    <span className="timeline-duration">{exp.duration}</span>
                                    <p>{exp.description}</p>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </motion.section>

            {/* Contact Section */}
            <motion.footer
                className="contact"
                initial="hidden"
                whileInView="visibleLeft"
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                variants={fadeIn}
            >
                <h2>Get in Touch</h2>
                <div className="contact-links">
                    <a href="mailto:lelievrezachary@gmail.com">lelievrezachary@gmail.com</a>
                    <a href="https://www.linkedin.com/in/zachary-lelièvre-757621230/">LinkedIn</a>
                    <a href="https://github.com/ZacharyLelievre">GitHub</a>
                </div>
            </motion.footer>
        </div>
    );

};

export default App;