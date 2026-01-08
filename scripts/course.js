// course.js
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, loops, functions, etc.) and vocabulary. In the course you will learn the Python programming language.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful programmers by learning to design and write functions and classes. This course requires students to program using Python 3.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

const courseList = document.getElementById('course-list');
const totalCreditsSpan = document.getElementById('total-credits');

function displayCourses(coursesToDisplay) {
    courseList.innerHTML = '';
    coursesToDisplay.forEach(course => {
        const div = document.createElement('div');
        div.classList.add('course-card');
        if (course.completed) {
            div.classList.add('completed');
        }

        div.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;
        // Could add more info like title or credits if design demands, 
        // wireframe shows just "WDD 130" style blocks.

        courseList.appendChild(div);
    });
}

function calculateCredits(coursesToCalculate) {
    const total = coursesToCalculate.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsSpan.textContent = total;
}

function filterCourses(category) {
    let filtered;
    if (category === 'all') {
        filtered = courses;
    } else {
        filtered = courses.filter(course => course.subject === category);
    }
    displayCourses(filtered);
    calculateCredits(filtered);
}

document.getElementById('all-btn').addEventListener('click', () => {
    filterCourses('all');
    setActiveButton('all-btn');
});

document.getElementById('cse-btn').addEventListener('click', () => {
    filterCourses('CSE');
    setActiveButton('cse-btn');
});

document.getElementById('wdd-btn').addEventListener('click', () => {
    filterCourses('WDD');
    setActiveButton('wdd-btn');
});

function setActiveButton(id) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Initial display
filterCourses('all');
