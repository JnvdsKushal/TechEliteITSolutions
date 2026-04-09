// ── src/data/courses.ts ───────────────────────────────────────────────────
// Complete course data for all 8 TechElite programs.
// getCourseBySlug() is used by CourseDetail to look up a course by its URL slug.

export interface CurriculumModule {
  module: string;
  topics: string[];
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  type: 'online' | 'offline';
  level: string;
  rating: string;
  duration: string;
  students: string;
  price: string;
  badge: string;
  description: string;
  detailedDescription: string;
  whatYouWillLearn: string[];
  curriculum?: CurriculumModule[];
  features: string[];
  prerequisites: string[];
  instructorInfo: string;
  accent: string;
  img: string;
}

const courses: Course[] = [
  {
    id: 1,
    slug: 'cyber-security-vapt',
    title: 'Cyber Security VAPT',
    type: 'online',
    level: 'Beginner Friendly',
    rating: '4.9',
    duration: '2 Months',
    students: '1800+',
    price: '₹45,000',
    badge: 'ZERO CODING',
    description: 'Master Vulnerability Assessment & Penetration Testing with hands-on labs. No coding background required.',
    detailedDescription: 'A complete, practical program covering ethical hacking, network defence, and VAPT methodologies used by security professionals worldwide — zero coding background needed.',
    whatYouWillLearn: [
      'Set up and use industry-standard VAPT toolkits',
      'Perform network vulnerability assessments',
      'Execute web application penetration tests',
      'Conduct wireless security audits',
      'Write professional penetration test reports',
      'Simulate real-world cyber attack scenarios and defenses',
      'Understand OWASP Top 10 vulnerabilities',
      'Implement remediation strategies',
    ],
    // curriculum: [
    //   { module: 'Module 1 – Foundations of Cyber Security', topics: ['CIA Triad & security concepts', 'Types of hackers & ethical hacking laws', 'Setting up your lab (Kali Linux, VMs)', 'Networking fundamentals for pentesters'] },
    //   { module: 'Module 2 – Reconnaissance & Scanning', topics: ['Passive recon: OSINT, Google Dorking', 'Active recon: Nmap, Netdiscover', 'Enumeration with Nessus & OpenVAS', 'Footprinting techniques'] },
    //   { module: 'Module 3 – Exploitation', topics: ['Metasploit framework deep-dive', 'Exploiting common CVEs', 'Password cracking: Hydra, John, Hashcat', 'Social engineering attacks'] },
    //   { module: 'Module 4 – Web Application VAPT', topics: ['OWASP Top 10 hands-on', 'SQL Injection & XSS attacks', 'Burp Suite mastery', 'API security testing'] },
    //   { module: 'Module 5 – Reporting & Certification Prep', topics: ['Writing executive & technical reports', 'CEH exam strategies', 'Mock VAPT assessments', 'Career pathways in cyber security'] },
    // ],
    features: [
      'Live instructor-led sessions',
      'Dedicated virtual lab environment',
      'Lifetime access to recordings',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic computer knowledge', 'Curiosity about how systems work', 'No programming experience required'],
    instructorInfo: 'Certified Ethical Hacker (CEH) with 10+ years of industry experience',
    accent: 'from-blue-700 via-blue-600 to-cyan-500',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  },
  {
    id: 2,
    slug: 'azure-data-engineering',
    title: 'Azure Data Engineering',
    type: 'online',
    level: 'Intermediate',
    rating: '4.8',
    duration: '2 Months',
    students: '980+',
    price: '₹48,000',
    badge: 'MICROSOFT',
    description: 'Build enterprise-grade data pipelines using ADF, Synapse Analytics, and Databricks on Azure.',
    detailedDescription: 'Master the full Microsoft Azure data stack — from ingestion to transformation to serving — and prepare for the DP-203 Data Engineering on Azure certification.',
    whatYouWillLearn: [
      'Design and build ADF pipelines end-to-end',
      'Work with Azure Synapse Analytics & SQL Pools',
      'Process big data with Azure Databricks & Spark',
      'Implement Delta Lake architectures',
      'Secure and monitor Azure data assets',
      'Design scalable and production-ready data architectures',
      'Build real-time streaming pipelines',
      'Optimise performance of data warehouses',
    ],
    // curriculum: [
    //   { module: 'Module 1 – Azure Fundamentals', topics: ['Azure portal & resource groups', 'Storage accounts, Blob & ADLS Gen2', 'Azure networking basics', 'IAM & RBAC'] },
    //   { module: 'Module 2 – Azure Data Factory', topics: ['Pipelines, datasets, linked services', 'Data flows & transformations', 'Triggers & scheduling', 'Monitoring & alerts'] },
    //   { module: 'Module 3 – Azure Synapse Analytics', topics: ['Dedicated vs serverless SQL pools', 'Synapse Spark pools', 'Synapse Link & integration', 'Star schema design'] },
    //   { module: 'Module 4 – Databricks & Spark', topics: ['Databricks workspace & clusters', 'PySpark fundamentals', 'Delta Lake & medallion architecture', 'MLflow basics'] },
    //   { module: 'Module 5 – DP-203 Exam Prep', topics: ['Practice exams & mock tests', 'Architecture design patterns', 'Cost optimisation strategies', 'End-to-end capstone project'] },
    // ],
    features: [
      'Live sessions with Azure-certified trainers',
      'Azure free-tier sandbox access',
      'Real enterprise project experience',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic SQL knowledge', 'Familiarity with cloud concepts (helpful, not required)', 'Basic Python is a plus'],
    instructorInfo: 'Microsoft Certified Azure Data Engineer with 8+ years in enterprise data platforms',
    accent: 'from-red-600 via-red-500 to-orange-400',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    id: 3,
    slug: 'ai-security',
    title: 'AI Security',
    type: 'online',
    level: 'Advanced',
    rating: '4.9',
    duration: '2 Months',
    students: '650+',
    price: '₹52,000',
    badge: 'HOT 🔥',
    description: 'Secure AI systems and ML pipelines. Learn adversarial attacks, model hardening, and AI governance.',
    detailedDescription: 'The only course in India that trains you to secure AI/ML systems end-to-end — from adversarial robustness to LLM red teaming and enterprise AI governance frameworks.',
    whatYouWillLearn: [
      'Understand AI/ML threat landscapes',
      'Execute adversarial attacks on ML models',
      'Harden models against evasion & poisoning',
      'Conduct LLM red teaming & prompt injection testing',
      'Apply AI governance frameworks (NIST AI RMF)',
      'Perform model explainability & bias audits',
      'Secure MLOps pipelines',
      'Build privacy-preserving ML systems',
    ],
    // curriculum: [
    //   { module: 'Module 1 – AI/ML Security Fundamentals', topics: ['ML pipeline overview', 'AI threat taxonomy', 'Attack surface mapping', 'Regulatory landscape (EU AI Act, NIST)'] },
    //   { module: 'Module 2 – Adversarial Machine Learning', topics: ['Evasion attacks (FGSM, PGD, C&W)', 'Poisoning & backdoor attacks', 'Model inversion & membership inference', 'Defence strategies & adversarial training'] },
    //   { module: 'Module 3 – LLM & GenAI Security', topics: ['Prompt injection & jailbreaking', 'LLM red teaming methodology', 'RAG security & data leakage', 'Securing AI agents'] },
    //   { module: 'Module 4 – MLOps Security', topics: ['Securing ML pipelines (CI/CD)', 'Model supply chain security', 'Data integrity & versioning', 'Monitoring for model drift & anomalies'] },
    //   { module: 'Module 5 – AI Governance & Capstone', topics: ['NIST AI RMF implementation', 'Ethics & fairness audits', 'AI risk documentation', 'Capstone: full AI security audit'] },
    // ],
    features: [
      'Hands-on adversarial attack labs',
      'LLM red teaming environment',
      'Access to GPU sandboxes',
      'AI governance templates & frameworks',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic Python programming', 'Familiarity with ML concepts (linear regression, neural networks)', 'Cyber security basics helpful'],
    instructorInfo: 'AI Security researcher with publications at top-tier security conferences',
    accent: 'from-amber-500 via-yellow-400 to-orange-400',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  },
  {
    id: 4,
    slug: 'devops-multi-cloud',
    title: 'DevOps (Multi Cloud)',
    type: 'online',
    level: 'Intermediate',
    rating: '4.8',
    duration: '2 Months',
    students: '1200+',
    price: '₹50,000',
    badge: 'AWS · AZURE · GCP',
    description: 'Master CI/CD pipelines, Kubernetes, and multi-cloud infrastructure across AWS, Azure, and GCP.',
    detailedDescription: 'A hands-on DevOps bootcamp covering the entire software delivery lifecycle — from source control to Kubernetes orchestration — across AWS, Azure, and Google Cloud.',
    whatYouWillLearn: [
      'Build and manage CI/CD pipelines with Jenkins & GitHub Actions',
      'Containerise applications with Docker',
      'Orchestrate workloads with Kubernetes (EKS/AKS/GKE)',
      'Write infrastructure-as-code with Terraform & Ansible',
      'Implement GitOps workflows with ArgoCD',
      'Monitor and observe systems with Prometheus & Grafana',
      'Manage cloud infrastructure on AWS, Azure, GCP',
      'Apply DevSecOps practices in pipelines',
    ],
    // curriculum: [
    //   { module: 'Module 1 – DevOps Foundations', topics: ['DevOps culture & SDLC', 'Linux essentials for DevOps', 'Git & version control strategies', 'Shell scripting basics'] },
    //   { module: 'Module 2 – CI/CD & Configuration Management', topics: ['Jenkins pipelines (declarative & scripted)', 'GitHub Actions workflows', 'Ansible playbooks & roles', 'SonarQube & code quality gates'] },
    //   { module: 'Module 3 – Containers & Kubernetes', topics: ['Docker fundamentals & Compose', 'Kubernetes architecture & objects', 'Helm charts & package management', 'EKS, AKS, GKE managed clusters'] },
    //   { module: 'Module 4 – Infrastructure as Code & Cloud', topics: ['Terraform modules & state management', 'AWS core services (EC2, S3, VPC, RDS)', 'Azure & GCP fundamentals', 'Multi-cloud networking'] },
    //   { module: 'Module 5 – Monitoring & DevSecOps', topics: ['Prometheus & Grafana stack', 'ELK/EFK logging', 'Container security (Trivy, Falco)', 'Capstone: full multi-cloud pipeline'] },
    // ],
    features: [
      'Live cloud lab environments (AWS + Azure + GCP)',
      'Real enterprise pipeline projects',
      'AWS/Azure certification guidance',
      'GitHub portfolio of deployed projects',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic Linux command line', 'Any programming/scripting familiarity', 'Basic networking concepts'],
    instructorInfo: 'AWS & Azure certified DevOps architect with 12+ years building enterprise pipelines',
    accent: 'from-indigo-600 via-blue-600 to-violet-500',
    img: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
  },
  {
    id: 5,
    slug: 'information-security',
    title: 'Information Security',
    type: 'online',
    level: 'Intermediate',
    rating: '4.7',
    duration: '2 Months',
    students: '900+',
    price: '₹42,000',
    badge: 'CISSP PREP',
    description: 'Comprehensive InfoSec training covering risk management, compliance, and enterprise security frameworks.',
    detailedDescription: 'A structured program covering the CISSP Common Body of Knowledge (CBK), GRC frameworks, and real-world enterprise security operations to prepare you for a career in information security management.',
    whatYouWillLearn: [
      'Implement ISO 27001 Information Security Management Systems',
      'Conduct risk assessments and build treatment plans',
      'Apply NIST Cybersecurity Framework',
      'Manage compliance with GDPR, HIPAA, PCI-DSS',
      'Design security architectures and controls',
      'Lead security awareness programs',
      'Prepare for CISSP certification',
      'Operate security policies and procedures',
    ],
    // curriculum: [
    //   { module: 'Module 1 – Security & Risk Management', topics: ['Security concepts & principles', 'Risk identification, analysis & treatment', 'Business continuity & disaster recovery', 'Legal, regulatory & compliance frameworks'] },
    //   { module: 'Module 2 – Asset & Access Management', topics: ['Asset classification & handling', 'Identity & access management (IAM)', 'MFA & PAM solutions', 'Data protection & privacy'] },
    //   { module: 'Module 3 – Security Architecture & Engineering', topics: ['Security models & architectures', 'Cryptography fundamentals', 'Secure network design', 'Vulnerability management lifecycle'] },
    //   { module: 'Module 4 – GRC & Compliance', topics: ['ISO 27001 implementation roadmap', 'GDPR, PCI-DSS & HIPAA deep-dive', 'Audit management & evidence collection', 'Third-party risk management'] },
    //   { module: 'Module 5 – CISSP Exam Prep', topics: ['All 8 CISSP domains review', 'Practice exam questions (1000+)', 'Memory techniques for CISSP', 'Mock exams & debrief sessions'] },
    // ],
    features: [
      '1000+ CISSP practice questions',
      'ISO 27001 templates & toolkits',
      'GRC platform hands-on access',
      'CISSP exam strategy sessions',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['2+ years of IT or security work experience (recommended)', 'Basic understanding of networking', 'No specific certification required to start'],
    instructorInfo: 'CISSP-certified security professional with 15+ years in GRC and enterprise security',
    accent: 'from-rose-600 via-red-500 to-red-600',
    img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  },
  {
    id: 6,
    slug: 'ai-ml-python',
    title: 'AI / ML with Python',
    type: 'online',
    level: 'Beginner to Advanced',
    rating: '4.9',
    duration: '2 Months',
    students: '2100+',
    price: '₹55,000',
    badge: 'MOST POPULAR',
    description: 'End-to-end AI and Machine Learning with Python. From fundamentals to deploying production models.',
    detailedDescription: 'India\'s most comprehensive AI/ML program — taking you from Python basics all the way through deep learning, NLP, computer vision, and deploying real production ML systems.',
    whatYouWillLearn: [
      'Master Python for data science (NumPy, Pandas, Matplotlib)',
      'Build supervised & unsupervised ML models from scratch',
      'Train deep neural networks with TensorFlow & PyTorch',
      'Apply NLP techniques and work with LLMs',
      'Build computer vision pipelines',
      'Deploy ML models with FastAPI & Docker',
      'Use MLOps practices (MLflow, DVC)',
      'Work on real industry datasets and Kaggle competitions',
    ],
    // curriculum: [
    //   { module: 'Module 1 – Python for Data Science', topics: ['Python fundamentals & OOP', 'NumPy & Pandas mastery', 'Data visualisation (Matplotlib, Seaborn, Plotly)', 'Exploratory Data Analysis (EDA)'] },
    //   { module: 'Module 2 – Machine Learning', topics: ['Regression & classification algorithms', 'Decision trees, Random Forest, XGBoost', 'Unsupervised learning (K-Means, DBSCAN, PCA)', 'Model evaluation & hyperparameter tuning'] },
    //   { module: 'Module 3 – Deep Learning', topics: ['Neural networks from scratch', 'CNNs for computer vision', 'RNNs, LSTMs, Transformers', 'Transfer learning & fine-tuning'] },
    //   { module: 'Module 4 – NLP & LLMs', topics: ['Text preprocessing & feature engineering', 'Sentiment analysis & text classification', 'Working with Hugging Face Transformers', 'Building RAG pipelines with LangChain'] },
    //   { module: 'Module 5 – MLOps & Deployment', topics: ['Model serialisation & serving with FastAPI', 'Containerising ML apps with Docker', 'Experiment tracking with MLflow', 'Capstone: end-to-end production ML project'] },
    // ],
    features: [
      'GPU-enabled Jupyter lab environment',
      'Kaggle competition guidance',
      'Real industry dataset projects',
      'MLOps deployment workshop',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic mathematics (algebra & statistics helpful)', 'No prior programming required', 'Laptop with 8GB+ RAM recommended'],
    instructorInfo: 'Data Scientist at a top MNC with 10+ years of industry and teaching experience',
    accent: 'from-yellow-500 via-amber-400 to-yellow-500',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
  },
  {
    id: 7,
    slug: 'java-testing',
    title: 'Java / Testing',
    type: 'online',
    level: 'Beginner',
    rating: '4.7',
    duration: '2 Months',
    students: '1400+',
    price: '₹35,000',
    badge: 'PLACEMENT FOCUSED',
    description: 'Full Java development with manual and automation testing. Industry-ready with Selenium and JUnit.',
    detailedDescription: 'A job-focused dual-track program combining Core Java and Spring Boot development with manual + Selenium automation testing — the ideal package for freshers targeting IT placements.',
    whatYouWillLearn: [
      'Core Java fundamentals and OOP principles',
      'Build REST APIs with Spring Boot',
      'Write and execute manual test cases',
      'Automate browsers with Selenium WebDriver',
      'Perform API testing with Postman & REST Assured',
      'Apply BDD with Cucumber & Gherkin',
      'Manage tests with TestNG & JUnit',
      'Use Git and basic CI/CD for test automation',
    ],
    // curriculum: [
    //   { module: 'Module 1 – Core Java', topics: ['Java syntax, data types & operators', 'OOP: classes, inheritance, polymorphism', 'Collections framework', 'Exception handling & file I/O'] },
    //   { module: 'Module 2 – Spring Boot', topics: ['Spring Boot project setup', 'REST API development', 'Spring Data JPA & MySQL', 'Basic Spring Security'] },
    //   { module: 'Module 3 – Manual Testing', topics: ['SDLC & STLC concepts', 'Test case design techniques', 'Bug lifecycle & defect reporting', 'Agile testing practices'] },
    //   { module: 'Module 4 – Selenium Automation', topics: ['Selenium WebDriver with Java', 'Page Object Model (POM)', 'TestNG framework & parallel execution', 'Extent reports & logging'] },
    //   { module: 'Module 5 – API Testing & CI/CD', topics: ['Postman collections & environments', 'REST Assured for API automation', 'Jenkins for automation pipeline', 'Capstone: full automation framework'] },
    // ],
    features: [
      'Placement-focused curriculum',
      'Mock technical interview sessions',
      'Resume building with real project experience',
      'TestNG + Selenium framework kit',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic computer knowledge', 'No prior programming experience needed', 'Eagerness to learn and practice daily'],
    instructorInfo: 'Senior Java developer & SDET with 9+ years at product companies',
    accent: 'from-blue-700 via-blue-600 to-indigo-600',
    img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
  },
  {
    id: 8,
    slug: 'soc-analyst',
    title: 'SOC Analyst',
    type: 'online',
    level: 'Intermediate',
    rating: '4.8',
    duration: '2 Months',
    students: '750+',
    price: '₹38,000',
    badge: 'IN DEMAND',
    description: 'Become a Security Operations Center analyst. Monitor, detect, and respond to cyber threats in real time.',
    detailedDescription: 'A specialised, fast-track program that trains you to work in a real Security Operations Center — detecting, triaging, and responding to security incidents using industry SIEM platforms and live threat feeds.',
    whatYouWillLearn: [
      'Operate SIEM platforms (Splunk & Microsoft Sentinel)',
      'Analyse and correlate security logs',
      'Triage and escalate security alerts',
      'Execute incident response playbooks',
      'Perform threat hunting using MITRE ATT&CK',
      'Investigate malware & phishing incidents',
      'Write detailed incident reports',
      'Understand SOC Tier 1/2/3 roles and workflows',
    ],
    // curriculum: [
    //   { module: 'Module 1 – SOC Fundamentals', topics: ['SOC structure & analyst tiers', 'Network & endpoint security concepts', 'Log types and sources', 'Introduction to MITRE ATT&CK'] },
    //   { module: 'Module 2 – SIEM Operations', topics: ['Splunk fundamentals & SPL queries', 'Microsoft Sentinel KQL', 'Alert creation & correlation rules', 'Dashboard & reporting'] },
    //   { module: 'Module 3 – Incident Detection & Triage', topics: ['Alert triage methodology', 'False positive analysis', 'Threat intelligence feeds integration', 'IOC extraction & analysis'] },
    //   { module: 'Module 4 – Incident Response', topics: ['IR lifecycle (PICERL framework)', 'Malware triage & sandbox analysis', 'Phishing investigation workflow', 'Evidence preservation & chain of custody'] },
    //   { module: 'Module 5 – Threat Hunting & Capstone', topics: ['Hypothesis-driven threat hunting', 'MITRE ATT&CK navigator', 'Writing incident reports', 'Capstone: live SOC simulation exercise'] },
    // ],
    features: [
      'Live SIEM lab (Splunk + Sentinel)',
      'Real threat feed simulations',
      'MITRE ATT&CK hands-on exercises',
      'Incident response playbook library',
      '100% placement assistance',
      'Industry-recognised certificate',
    ],
    prerequisites: ['Basic networking knowledge (TCP/IP, DNS, HTTP)', 'Basic understanding of Windows & Linux', 'Cyber Security VAPT course or equivalent experience helpful'],
    instructorInfo: 'SOC Lead analyst with 8+ years detecting nation-state threats at enterprise scale',
    accent: 'from-slate-700 via-slate-600 to-blue-600',
    img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80',
  },
];

export function getCourseBySlug(slug: string): Course | null {
  return courses.find(c => c.slug === slug) ?? null;
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getCoursesByType(type: 'online' | 'offline'): Course[] {
  return courses.filter(c => c.type === type);
}

export default courses;