
import { NavItem, Program, Testimonial } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: { ar: 'الرئيسية', fr: 'Accueil' }, href: 'home' },
  { id: 'about', label: { ar: 'عن المؤسسة', fr: 'À Propos' }, href: 'about' },
  { id: 'programs', label: { ar: 'الأسلاك التعليمية', fr: 'Cycles' }, href: 'programs' },
  { id: 'campus', label: { ar: 'الحياة المدرسية', fr: 'Vie Scolaire' }, href: 'campus' },
  { id: 'admissions', label: { ar: 'التسجيل', fr: 'Admissions' }, href: 'admissions' },
  { id: 'contact', label: { ar: 'اتصل بنا', fr: 'Contact' }, href: 'contact' },
];

export const AWARDS = [
  {
    id: 1,
    title: { ar: 'شريك كامبريدج الدولي', fr: 'Partenaire Cambridge' },
    icon: 'Award',
    image: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Cambridge_Assessment_International_Education_Logo.svg/1200px-Cambridge_Assessment_International_Education_Logo.svg.png'
  },
  {
    id: 2,
    title: { ar: 'علامة الجودة الفرنسية', fr: 'Label FrancÉducation' },
    icon: 'ShieldCheck',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Label_FrancEducation_Logo.png/640px-Label_FrancEducation_Logo.png'
  },
  {
    id: 3,
    title: { ar: 'شهادة الجودة ISO 9001', fr: 'Certification ISO 9001' },
    icon: 'CheckCircle2',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/ISO_9001_Logo.svg/1024px-ISO_9001_Logo.svg.png'
  },
  {
    id: 4,
    title: { ar: 'مدرسة مايكروسوفت النموذجية', fr: 'Microsoft Showcase School' },
    icon: 'Cpu',
    image: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageMedia/RE4OAg6?ver=cf33'
  }
];

export const ADVANTAGES = [
  {
    id: 1,
    title: { ar: 'بيئة ذكية 100%', fr: 'Campus Intelligent' },
    desc: { ar: 'استخدام الألواح التفاعلية والذكاء الاصطناعي في التعليم.', fr: 'Tableaux interactifs et IA intégrés au cursus.' },
    icon: 'Cpu'
  },
  {
    id: 2,
    title: { ar: 'ثلاث لغات حية', fr: 'Trilinguisme' },
    desc: { ar: 'إتقان العربية، الفرنسية، والإنجليزية منذ التعليم الأولي.', fr: 'Maîtrise de l\'Arabe, Français et Anglais dès la maternelle.' },
    icon: 'Languages'
  },
  {
    id: 3,
    title: { ar: 'أندية الابتكار', fr: 'Innovation Hub' },
    desc: { ar: 'أندية للروبوتيك، الشطرنج، والبرمجة لتنمية الذكاء.', fr: 'Clubs de robotique, échecs et codage pour l\'éveil.' },
    icon: 'Lightbulb'
  }
];

export const PROGRAMS: Program[] = [
  {
    id: 'maternelle',
    title: { ar: 'التعليم الأولي', fr: 'Maternelle' },
    description: {
      ar: 'منهج "مونتيسوري" المطور لتنمية مهارات الطفل اللغوية والاجتماعية في بيئة محفزة.',
      fr: 'Pédagogie active pour l\'éveil sensoriel et l\'autonomie précoce de l\'enfant.'
    },
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1540479859555-17af45c78602?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'primaire',
    title: { ar: 'التعليم الابتدائي', fr: 'Primaire' },
    description: {
      ar: 'تركيز على التميز العلمي واللغوي مع مواكبة فردية لكل تلميذ لضمان التفوق.',
      fr: 'Socle d\'excellence bilingue avec un suivi personnalisé pour chaque talent.'
    },
    icon: 'BookOpen',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'secondaire',
    title: { ar: 'الثانوي والإعدادي', fr: 'Collège & Lycée' },
    description: {
      ar: 'توجيه جامعي استراتيجي ومختبرات علمية متطورة تفتح آفاق المدارس الكبرى.',
      fr: 'Orientation stratégique et laboratoires de pointe pour intégrer les grandes écoles.'
    },
    icon: 'GraduationCap',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'أمين العلمي',
    role: { ar: 'خريج - طالب مهندس', fr: 'Alumni - Élève Ingénieur' },
    content: {
      ar: 'العمران لم تكن مجرد مدرسة، بل كانت المشتل الذي نما فيه طموحي للوصول لأكبر مدارس الهندسة العالمية.',
      fr: 'Al Oumrane a été le tremplin idéal pour mon parcours d\'excellence en école d\'ingénieurs.'
    },
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
    achievement: { ar: 'مقبول في Polytechnique Paris', fr: 'Admis à Polytechnique Paris' }
  },
  {
    id: '2',
    author: 'سارة لمراني',
    role: { ar: 'ولية أمر', fr: 'Parent d\'élève' },
    content: {
      ar: 'أكثر ما يميز المؤسسة هو التوازن بين الصرامة الأكاديمية والتربية على القيم الأخلاقية والوطنية.',
      fr: 'Ce qui distingue l\'école, c\'est l\'équilibre entre rigueur et éducation aux valeurs.'
    },
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    achievement: { ar: 'أم لثلاثة تلاميذ متفوقين', fr: 'Mère de 3 élèves excellents' }
  },
  {
    id: '3',
    author: 'ياسين منصور',
    role: { ar: 'خريج - دكتور صيدلي', fr: 'Alumni - Docteur en Pharmacie' },
    content: {
      ar: 'الأساس المتين الذي تلقيته في المواد العلمية واللغات مكنني من التفوق في مساري الجامعي بكل سلاسة.',
      fr: 'La base solide en sciences et langues m\'a permis d\'exceller dans mon parcours universitaire.'
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    achievement: { ar: 'خريج كلية الطب والصيدلة', fr: 'Lauréat de la FMP' }
  },
  {
    id: '4',
    author: 'ليلى بناني',
    role: { ar: 'خريجة - مدرسة الحكامة', fr: 'Alumni - Sciences Po' },
    content: {
      ar: 'نادي الخطابة والمناظرة بالمدرسة صقل شخصيتي وجعلني أثق في قدراتي القيادية منذ وقت مبكر.',
      fr: 'Le club de débat a forgé ma personnalité et ma confiance en mes capacités de leadership.'
    },
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    achievement: { ar: 'مقبولة في Sciences Po', fr: 'Admise à Sciences Po' }
  }
];

export const TOUR_STATIONS = [
  {
    id: 'swimming-pool',
    title: { ar: 'المسبح', fr: 'Piscine' },
    description: { ar: 'مسبح مغطى ومجهز وفق المعايير الدولية لتعليم السباحة وتنظيم الأنشطة المائية على مدار السنة.', fr: 'Piscine couverte aux normes internationales pour l\'apprentissage de la natation et les activités aquatiques toute l\'année.' },
    image: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'library',
    title: { ar: 'المكتبة', fr: 'Bibliothèque' },
    description: { ar: 'مكتبة عصرية غنية بآلاف الكتب والمراجع العلمية والأدبية مع فضاءات مريحة للقراءة والمطالعة.', fr: 'Bibliothèque moderne riche en milliers de livres et références scientifiques avec des espaces de lecture confortables.' },
    image: '/images/school_library.png'
  },
  {
    id: 'sports-field',
    title: { ar: 'الملعب', fr: 'Terrain de Sport' },
    description: { ar: 'ملعب رياضي متعدد الاستخدامات بعشب اصطناعي عالي الجودة لممارسة كرة القدم وألعاب القوى والأنشطة الرياضية.', fr: 'Terrain multisports en gazon synthétique de haute qualité pour le football, l\'athlétisme et les activités sportives.' },
    image: '/images/sports_field.png'
  },
  {
    id: 'computer-lab',
    title: { ar: 'قاعة الإعلاميات', fr: 'Salle Informatique' },
    description: { ar: 'قاعة مجهزة بأحدث الحواسيب والبرمجيات التعليمية لتعلم البرمجة والتكنولوجيا الحديثة.', fr: 'Salle équipée des derniers ordinateurs et logiciels éducatifs pour l\'apprentissage de la programmation et des nouvelles technologies.' },
    image: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'garden',
    title: { ar: 'البستنة', fr: 'Jardin Pédagogique' },
    description: { ar: 'حديقة تعليمية لتعريف التلاميذ بالزراعة والبيئة والاستدامة من خلال أنشطة عملية ممتعة.', fr: 'Jardin éducatif pour initier les élèves à l\'agriculture, l\'environnement et la durabilité à travers des activités pratiques.' },
    image: '/images/school_garden.png'
  },
  {
    id: 'smart-class',
    title: { ar: 'فصل السبورة التفاعلية', fr: 'Classe Interactive' },
    description: { ar: 'فصول ذكية مجهزة بسبورات تفاعلية وتقنيات عرض متطورة لتجربة تعليمية تفاعلية وممتعة.', fr: 'Classes intelligentes équipées de tableaux interactifs et de technologies de projection avancées pour une expérience éducative immersive.' },
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1200'
  }
];
