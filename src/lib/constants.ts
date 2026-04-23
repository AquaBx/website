import {
    BriefcaseBusiness,
    GraduationCap,
    HandHeart,
    Swords,
    CircleHelp
} from "@steeze-ui/lucide-icons";

export const CATEGORY_STYLES = {
    volunteering: {
        color: "bg-pink-400/30 text-pink-600 border-pink-600",
        icon: HandHeart,
    },
    work: {
        color: "bg-yellow-400/30 text-yellow-600 border-yellow-600",
        icon: BriefcaseBusiness,
    },
    study: {
        color: "bg-green-400/30 text-green-600 border-green-600",
        icon: GraduationCap,
    },
    contest: {
        color: "bg-red-400/30 text-red-600 border-red-600",
        icon: Swords,
    },
    default: {
        color: "bg-gray-400/30 text-gray-600 border-gray-600",
        icon: CircleHelp,
    }
};
