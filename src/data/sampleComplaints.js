/**
 * Sample realistic campus complaints for AI-Powered Campus Complaint & Maintenance Tracker
 */

export const SAMPLE_COMPLAINTS = [
  {
    id: "CMP-2026-1001",
    title: "Broken light in Block A classroom 102",
    description: "The overhead fluorescent tubes are flickering violently and two of them have completely stopped working. The classroom is very dim, creating difficulty for students during evening lectures.",
    category: "Electrical",
    priority: "Medium",
    status: "In Progress",
    department: "Electrical Maintenance",
    assignedTo: "Rajesh Kumar (Lead Electrician)",
    location: "Block A, 1st Floor, Room 102",
    building: "Block A",
    createdAt: "2026-09-18T10:30:00Z",
    updatedAt: "2026-09-19T14:15:00Z",
    imageUrl: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Alex Morgan",
      email: "alex.morgan@campus.edu",
      role: "Student",
      studentId: "STD-2024-8842",
      department: "Computer Science & Engineering",
      phone: "+1 (555) 234-5678"
    },
    aiAnalysis: {
      category: "Electrical",
      priority: "Medium",
      department: "Electrical Maintenance",
      summary: "Fluorescent tube failure and flickering in Room 102 causing inadequate illumination for lectures.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Lighting issues disrupt academic activities and cause eyestrain, but do not pose immediate structural danger.",
      predictedResolutionHours: 8,
      resolutionTimeEstimate: "4 - 8 Hours",
      routingRecommendation: "Electrical Maintenance - Team Alpha (Classroom Facilities)",
      confidence: 0.94
    },
    adminRemarks: "Parts ordered from central store; electrician scheduled for 3:00 PM today.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-18T10:30:00Z",
        by: "Alex Morgan (Student)",
        note: "Complaint submitted via Campus Portal. AI auto-categorized under Electrical with Medium priority."
      },
      {
        status: "Under Review",
        timestamp: "2026-09-18T11:45:00Z",
        by: "Campus Admin",
        note: "Verified complaint details and confirmed room schedule with CS dept."
      },
      {
        status: "Assigned",
        timestamp: "2026-09-18T14:00:00Z",
        by: "Campus Admin",
        note: "Assigned work order to Rajesh Kumar (Lead Electrician)."
      },
      {
        status: "In Progress",
        timestamp: "2026-09-19T09:30:00Z",
        by: "Rajesh Kumar",
        note: "Inspected wiring and ballast. Replacement fixtures requested from inventory."
      }
    ]
  },
  {
    id: "CMP-2026-1002",
    title: "Water leakage near laboratory entrance",
    description: "There is water leaking continuously from the ceiling pipe joint right in front of the Advanced Chemistry Lab. Water is pooling on the hallway tile floor, making it extremely slippery and hazardous.",
    category: "Plumbing",
    priority: "High",
    status: "Assigned",
    department: "Plumbing Maintenance",
    assignedTo: "David Vance (Senior Plumber)",
    location: "Science Complex, 2nd Floor, Hallway near Chem Lab 2B",
    building: "Science Complex",
    createdAt: "2026-09-19T08:15:00Z",
    updatedAt: "2026-09-19T09:00:00Z",
    imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Dr. Sarah Lin",
      email: "sarah.lin@campus.edu",
      role: "Faculty/Staff",
      studentId: "FAC-1092",
      department: "Chemistry Department",
      phone: "+1 (555) 345-6789"
    },
    aiAnalysis: {
      category: "Plumbing",
      priority: "High",
      department: "Plumbing Maintenance",
      summary: "Continuous overhead pipe leakage creating high-risk slip hazards and potential electrical short-circuit risk near Science Labs.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Uncontrolled water pooling in high-foot-traffic corridor adjacent to chemistry laboratories creates severe slip hazard and secondary water damage.",
      predictedResolutionHours: 3,
      resolutionTimeEstimate: "2 - 4 Hours",
      routingRecommendation: "Emergency Plumbing Response Unit",
      confidence: 0.98
    },
    adminRemarks: "Caution wet floor signs deployed immediately. Emergency shut-off valve isolated for branch 4.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-19T08:15:00Z",
        by: "Dr. Sarah Lin (Faculty)",
        note: "High priority complaint logged. AI flagged safety hazard and prioritized for urgent dispatch."
      },
      {
        status: "Under Review",
        timestamp: "2026-09-19T08:25:00Z",
        by: "Campus Facilities Dispatch",
        note: "Fast-tracked due to High Priority rating."
      },
      {
        status: "Assigned",
        timestamp: "2026-09-19T08:45:00Z",
        by: "Campus Facilities Dispatch",
        note: "Dispatched David Vance with plumbing pipe repair kit."
      }
    ]
  },
  {
    id: "CMP-2026-1003",
    title: "Damaged desk in Room 204",
    description: "The middle row wooden desk has a cracked surface and exposed rusted screws on the right side. A student tore their jacket and it is unsafe for use during seminars.",
    category: "Furniture",
    priority: "Low",
    status: "Under Review",
    department: "Carpentry & Furniture",
    assignedTo: "Unassigned",
    location: "Block B, 2nd Floor, Seminar Room 204",
    building: "Block B",
    createdAt: "2026-09-19T11:20:00Z",
    updatedAt: "2026-09-19T11:20:00Z",
    imageUrl: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Alex Morgan",
      email: "alex.morgan@campus.edu",
      role: "Student",
      studentId: "STD-2024-8842",
      department: "Computer Science & Engineering",
      phone: "+1 (555) 234-5678"
    },
    aiAnalysis: {
      category: "Furniture",
      priority: "Low",
      department: "Carpentry & Furniture",
      summary: "Cracked wooden student desk with protruding rusted fastener in Room 204.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Isolated furniture damage with minor scratch hazard; classroom has alternative seating available.",
      predictedResolutionHours: 24,
      resolutionTimeEstimate: "24 - 48 Hours",
      routingRecommendation: "Campus Carpentry & Facilities Workshop",
      confidence: 0.91
    },
    adminRemarks: "Desk tagged for repair during the weekend maintenance window.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-19T11:20:00Z",
        by: "Alex Morgan (Student)",
        note: "Complaint submitted and acknowledged."
      },
      {
        status: "Under Review",
        timestamp: "2026-09-19T13:10:00Z",
        by: "Campus Admin",
        note: "Reviewing carpenter schedule."
      }
    ]
  },
  {
    id: "CMP-2026-1004",
    title: "Unclean washroom in Block B",
    description: "The second floor male washroom has clogged sinks, unpleasant odor, overflowing trash bins, and lack of handwash soap. It has not been sanitized since yesterday.",
    category: "Cleaning",
    priority: "High",
    status: "In Progress",
    department: "Housekeeping & Sanitation",
    assignedTo: "Maria Santos (Housekeeping Supervisor)",
    location: "Block B, 2nd Floor, Restroom wing",
    building: "Block B",
    createdAt: "2026-09-19T14:40:00Z",
    updatedAt: "2026-09-19T15:10:00Z",
    imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Rohan Gupta",
      email: "rohan.gupta@campus.edu",
      role: "Student",
      studentId: "STD-2023-7110",
      department: "Mechanical Engineering",
      phone: "+1 (555) 456-7890"
    },
    aiAnalysis: {
      category: "Cleaning",
      priority: "High",
      department: "Housekeeping & Sanitation",
      summary: "Hygiene breakdown in Block B washroom with clogged sinks, foul odor, and sanitary supply shortage.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Restroom hygiene failure poses sanitary and biological health hazards to student body.",
      predictedResolutionHours: 2,
      resolutionTimeEstimate: "1 - 2 Hours",
      routingRecommendation: "Housekeeping Rapid Response Team",
      confidence: 0.97
    },
    adminRemarks: "Deep cleaning crew dispatched with disinfectant supplies and plumbing snake.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-19T14:40:00Z",
        by: "Rohan Gupta (Student)",
        note: "Submitted with urgency rating High."
      },
      {
        status: "Assigned",
        timestamp: "2026-09-19T14:55:00Z",
        by: "Estate Officer",
        note: "Dispatched Maria Santos's sanitation crew."
      },
      {
        status: "In Progress",
        timestamp: "2026-09-19T15:10:00Z",
        by: "Maria Santos",
        note: "Cleaning in progress, drain being cleared."
      }
    ]
  },
  {
    id: "CMP-2026-1005",
    title: "Wi-Fi not working in library reading hall",
    description: "The campus Wi-Fi access point 'BIT-Students-5G' in the Central Library 3rd floor quiet study area is completely dropping connections. Students are unable to access research journals or submit online assignments.",
    category: "Internet/Network",
    priority: "Medium",
    status: "Resolved",
    department: "IT & Network Infrastructure",
    assignedTo: "Kevin Chen (Network Systems Admin)",
    location: "Central Library, 3rd Floor, West Study Wing",
    building: "Central Library",
    createdAt: "2026-09-17T09:00:00Z",
    updatedAt: "2026-09-17T11:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Emily Watson",
      email: "emily.watson@campus.edu",
      role: "Student",
      studentId: "STD-2024-9104",
      department: "Biotechnology",
      phone: "+1 (555) 567-8901"
    },
    aiAnalysis: {
      category: "Internet/Network",
      priority: "Medium",
      department: "IT & Network Infrastructure",
      summary: "Network gateway dropouts affecting student research connectivity in 3rd-floor library wing.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Widespread academic impediment during study hours, requires IT router reboot/firmware review.",
      predictedResolutionHours: 3,
      resolutionTimeEstimate: "2 - 4 Hours",
      routingRecommendation: "Campus IT Network Operations Center",
      confidence: 0.96
    },
    adminRemarks: "Rebooted PoE switch #3 on 3rd floor rack; updated DHCP lease pool. Connection verified stable.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-17T09:00:00Z",
        by: "Emily Watson (Student)",
        note: "Complaint filed."
      },
      {
        status: "Assigned",
        timestamp: "2026-09-17T09:20:00Z",
        by: "IT Helpdesk",
        note: "Assigned to Network Admin Kevin Chen."
      },
      {
        status: "In Progress",
        timestamp: "2026-09-17T09:45:00Z",
        by: "Kevin Chen",
        note: "Diagnosing PoE power budget and signal noise."
      },
      {
        status: "Resolved",
        timestamp: "2026-09-17T11:30:00Z",
        by: "Kevin Chen",
        note: "Switch rebooted and AP re-provisioned. Speed test: 180 Mbps down / 95 Mbps up."
      }
    ]
  },
  {
    id: "CMP-2026-1006",
    title: "Broken fan in seminar hall",
    description: "Ceiling fan #4 on the south side of the main Auditorium / Seminar Hall is making an alarming grinding noise and wobbling violently at speed setting 3. We had to turn it off to prevent it falling.",
    category: "Electrical",
    priority: "Medium",
    status: "Assigned",
    department: "Electrical Maintenance",
    assignedTo: "Rajesh Kumar (Lead Electrician)",
    location: "Main Auditorium, Ground Floor, Seminar Hall B",
    building: "Main Auditorium",
    createdAt: "2026-09-19T16:00:00Z",
    updatedAt: "2026-09-19T16:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Prof. Arthur Pendelton",
      email: "arthur.pendelton@campus.edu",
      role: "Faculty/Staff",
      studentId: "FAC-0841",
      department: "Civil Engineering",
      phone: "+1 (555) 678-9012"
    },
    aiAnalysis: {
      category: "Electrical",
      priority: "Medium",
      department: "Electrical Maintenance",
      summary: "Ceiling fan bearing failure with severe wobble and noise in Seminar Hall B posing mechanical drop risk.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Mechanical bearing wear creates potential projectile/falling risk if operated; requires mounting reinforcement.",
      predictedResolutionHours: 6,
      resolutionTimeEstimate: "4 - 8 Hours",
      routingRecommendation: "Electrical Maintenance - Heavy Fixtures Crew",
      confidence: 0.95
    },
    adminRemarks: "Fan circuit isolated. Work ladder scheduled for tomorrow morning 8 AM.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-19T16:00:00Z",
        by: "Prof. Arthur Pendelton",
        note: "Submitted with safety warning."
      },
      {
        status: "Assigned",
        timestamp: "2026-09-19T16:45:00Z",
        by: "Campus Admin",
        note: "Assigned to Rajesh Kumar."
      }
    ]
  },
  {
    id: "CMP-2026-1007",
    title: "Garbage overflowing near canteen backyard",
    description: "The large campus green dumpsters behind the Student Activity Canteen are overflowing with food waste and plastic containers. Stray animals are scattering trash across the lawn and it is attracting flies.",
    category: "Cleaning",
    priority: "High",
    status: "Submitted",
    department: "Housekeeping & Sanitation",
    assignedTo: "Unassigned",
    location: "Student Center, Rear Entrance adjacent to Cafeteria Lawn",
    building: "Student Center",
    createdAt: "2026-09-20T07:45:00Z",
    updatedAt: "2026-09-20T07:45:00Z",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Alex Morgan",
      email: "alex.morgan@campus.edu",
      role: "Student",
      studentId: "STD-2024-8842",
      department: "Computer Science & Engineering",
      phone: "+1 (555) 234-5678"
    },
    aiAnalysis: {
      category: "Cleaning",
      priority: "High",
      department: "Housekeeping & Sanitation",
      summary: "Severe waste overflow behind cafeteria causing pest attraction and public health/sanitary concerns.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Decomposing organic refuse attracts pests and violates institutional sanitary standards during dining hours.",
      predictedResolutionHours: 2,
      resolutionTimeEstimate: "1 - 3 Hours",
      routingRecommendation: "Sanitation & Waste Hauling Crew",
      confidence: 0.98
    },
    adminRemarks: "",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-20T07:45:00Z",
        by: "Alex Morgan (Student)",
        note: "Complaint submitted. AI categorized under Cleaning with High priority."
      }
    ]
  },
  {
    id: "CMP-2026-1008",
    title: "Door lock damaged in laboratory",
    description: "The electronic keycard latch and manual deadbolt of Software Engineering Research Lab 304 does not lock properly. The door can be pushed open without authentication, endangering expensive GPU servers and equipment.",
    category: "Security",
    priority: "High",
    status: "Under Review",
    department: "Campus Security & Locksmith",
    assignedTo: "Unassigned",
    location: "IT & Computing Complex, 3rd Floor, Lab 304",
    building: "IT Complex",
    createdAt: "2026-09-20T08:30:00Z",
    updatedAt: "2026-09-20T08:30:00Z",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
    submittedBy: {
      name: "Dr. Marcus Thorne",
      email: "marcus.thorne@campus.edu",
      role: "Faculty/Staff",
      studentId: "FAC-0412",
      department: "Computer Science & Engineering",
      phone: "+1 (555) 789-0123"
    },
    aiAnalysis: {
      category: "Security",
      priority: "High",
      department: "Campus Security & Locksmith",
      summary: "Compromised magnetic lock mechanism on Lab 304 leaving high-value computing equipment accessible to unauthorized personnel.",
      duplicate: false,
      duplicateOfId: null,
      reason: "Asset loss vulnerability and unauthorized access risk to specialized computing infrastructure.",
      predictedResolutionHours: 4,
      resolutionTimeEstimate: "2 - 4 Hours",
      routingRecommendation: "Access Control & Campus Security Systems",
      confidence: 0.96
    },
    adminRemarks: "Security guard stationed temporarily at hallway post until physical latch is replaced.",
    history: [
      {
        status: "Submitted",
        timestamp: "2026-09-20T08:30:00Z",
        by: "Dr. Marcus Thorne",
        note: "Submitted with High priority security alert."
      },
      {
        status: "Under Review",
        timestamp: "2026-09-20T08:45:00Z",
        by: "Campus Admin",
        note: "Notified campus security head and dispatch."
      }
    ]
  }
];

export const CAMPUS_BUILDINGS = [
  "Block A - Humanities & Math",
  "Block B - Classrooms & Lecture Halls",
  "Science Complex & Labs",
  "IT & Computing Complex",
  "Central Library",
  "Main Auditorium",
  "Student Center & Cafeteria",
  "Sports Complex & Gymnasium",
  "Hostel Block 1 (North)",
  "Hostel Block 2 (South)",
  "Administrative Building"
];

export const COMPLAINT_CATEGORIES = [
  "Electrical",
  "Plumbing",
  "Furniture",
  "Cleaning",
  "Internet/Network",
  "Security",
  "Other"
];

export const DEPARTMENTS = [
  "Electrical Maintenance",
  "Plumbing Services",
  "Carpentry & Furniture",
  "Housekeeping & Sanitation",
  "IT & Network Infrastructure",
  "Campus Security & Locksmith",
  "General Facilities"
];

export const TECHNICIANS = [
  { name: "Rajesh Kumar", role: "Lead Electrician", department: "Electrical Maintenance" },
  { name: "Suresh Pillai", role: "Assistant Electrician", department: "Electrical Maintenance" },
  { name: "David Vance", role: "Senior Plumber", department: "Plumbing Services" },
  { name: "Michael Chang", role: "Plumbing Technician", department: "Plumbing Services" },
  { name: "Robert Taylor", role: "Master Carpenter", department: "Carpentry & Furniture" },
  { name: "Maria Santos", role: "Housekeeping Supervisor", department: "Housekeeping & Sanitation" },
  { name: "Anwar Sheikh", role: "Sanitation Lead", department: "Housekeeping & Sanitation" },
  { name: "Kevin Chen", role: "Network Systems Admin", department: "IT & Network Infrastructure" },
  { name: "Priya Sharma", role: "IT Hardware Specialist", department: "IT & Network Infrastructure" },
  { name: "Officer James Miller", role: "Security Systems Officer", department: "Campus Security & Locksmith" }
];
