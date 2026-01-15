import {
  User,
  Zap,
  Crown,
  Shield,
  Facebook,
  Github,
  Linkedin,
  ExternalLink,
  Plus,
} from "lucide-react";
import { Button } from "antd";
import { Badge } from "@/app/components/profile_tabs";
import { I_skills_user } from "@/app/lib/types/categories";
interface SkillInformationProps {
  initialSkills?: I_skills_user[];
}

export const SkillInformation = ({
  initialSkills = [],
}: SkillInformationProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            Kỹ năng chuyên môn
          </h3>
        </div>
        <Button icon={<Plus size={18} />}>Thêm mới</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {initialSkills.map((skill) => (
          <div
            key={skill.skill_id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all bg-white"
          >
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div className="p-3 bg-gray-50 rounded-lg">
                <Zap size={24} className="text-gray-400" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{skill.skill.name}</h4>
                <Badge level={skill.level || "beginner"} />
              </div>
            </div>

            <div className="flex items-center gap-3 pl-14 sm:pl-0">
              <Button type="link">Chỉnh sửa</Button>
              {skill.proof_link ? (
                <a
                  href={skill.proof_link}
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={14} /> Minh chứng
                </a>
              ) : (
                <span className="text-sm text-gray-400 italic">
                  Chưa có minh chứng
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
