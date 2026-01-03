
import { PROGRAMS, ADVANTAGES } from '../constants';

export const getLocalResponse = async (userMessage: string, lang: 'ar' | 'fr') => {
    const msg = userMessage.toLowerCase();

    // Registration / Admission
    if (msg.includes('تسجيل') || msg.includes('inscrire') || msg.includes('inscription') || msg.includes('سجل')) {
        return lang === 'ar'
            ? 'يمكنكم التسجيل عبر التوجه لصفحة "التسجيل" في القائمة العلوية وملء الاستمارة، أو زيارة مقر المؤسسة مباشرة.'
            : 'Vous pouvez vous inscrire en accédant à la page "Admissions" dans le menu supérieur ou en visitant notre établissement directement.';
    }

    // Contact / Phone
    if (msg.includes('هاتف') || msg.includes('رقم') || msg.includes('اتصال') || msg.includes('contact') || msg.includes('تلفون') || msg.includes('tel')) {
        return lang === 'ar'
            ? 'يمكنكم التواصل معنا عبر الهاتف على الرقم: 24 25 97 22 05 (05 22 97 25 24).'
            : 'Vous pouvez nous contacter par téléphone au : 05 22 97 25 24.';
    }

    // Location
    if (msg.includes('عنوان') || msg.includes('موقع') || msg.includes('فين') || msg.includes('adresse') || msg.includes('lieu') || msg.includes('بلاصتكم')) {
        return lang === 'ar'
            ? 'مقرنا في الدار البيضاء: Lot Salma, Bd Sidi Maârouf, Casablanca.'
            : 'Notre adresse : Lot Salma, Bd Sidi Maârouf, Casablanca.';
    }

    // Programs / Levels
    if (msg.includes('ابتدائي') || msg.includes('primaire')) {
        const prog = PROGRAMS.find(p => p.id === 'primaire');
        return lang === 'ar' ? prog?.description.ar : prog?.description.fr;
    }
    if (msg.includes('روض') || msg.includes('maternelle') || msg.includes('بري')) {
        const prog = PROGRAMS.find(p => p.id === 'maternelle');
        return lang === 'ar' ? prog?.description.ar : prog?.description.fr;
    }
    if (msg.includes('ثانوي') || msg.includes('إعدادي') || msg.includes('lycée') || msg.includes('collège')) {
        const prog = PROGRAMS.find(p => p.id === 'secondaire');
        return lang === 'ar' ? prog?.description.ar : prog?.description.fr;
    }

    // Languages
    if (msg.includes('لغات') || msg.includes('langue') || msg.includes('فرنسي') || msg.includes('english')) {
        const adv = ADVANTAGES.find(a => a.id === 2);
        return lang === 'ar' ? adv?.desc.ar : adv?.desc.fr;
    }

    // Default
    return lang === 'ar'
        ? 'شكراً لتواصلكم مع مجموعة مدارس العمران. للحصول على إجابة أدق، يرجى الاستفسار عن التسجيل، الموقع، أو الاتصال بنا مباشرة.'
        : 'Merci de contacter le Groupe Scolaire Al Oumrane. Pour une réponse précise, n\'hésitez pas à nous interroger sur les admissions, notre adresse ou comment nous contacter.';
};
