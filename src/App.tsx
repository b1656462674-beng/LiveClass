/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  BookOpen, 
  Globe, 
  Baby, 
  MessageCircle, 
  Settings, 
  Star, 
  Heart, 
  Zap,
  Play,
  MessageSquare,
  Users,
  Award,
  ChevronRight,
  Volume2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

type Page = 'home' | 'oral' | 'ielts' | 'study-abroad' | 'minor-lang' | 'ht-teachers' | 'course-detail';

interface Course {
  id: string;
  title: string;
  subtitle?: string;
  price?: string;
  lessons?: string;
  seed?: string;
  tags?: string[];
  icon?: string;
  type?: 'ielts' | 'japan' | 'korea' | 'minor' | 'oral';
  isMixed?: boolean;
}

interface KingKongItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

// --- Constants ---

const KING_KONG_ITEMS: KingKongItem[] = [
  { id: 'oral', label: '英语口语', icon: <MessageCircle className="w-6 h-6 text-white" />, color: 'bg-blue-400' },
  { id: 'ielts', label: '雅思课程', icon: <BookOpen className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
  { id: 'study-abroad', label: '日韩留学', icon: <Globe className="w-6 h-6 text-white" />, color: 'bg-yellow-500' },
  { id: 'minor-lang', label: '小语种课程', icon: <Globe className="w-6 h-6 text-white" />, color: 'bg-emerald-500' },
  { id: 'op3', label: '运营配置3', icon: <Settings className="w-6 h-6 text-white" />, color: 'bg-emerald-500' },
  { id: 'ht-teachers', label: 'HT-外教课程', icon: <Star className="w-6 h-6 text-white" />, color: 'bg-orange-400' },
  { id: 'op4', label: '运营配置4', icon: <Heart className="w-6 h-6 text-white" />, color: 'bg-rose-400' },
  { id: 'op8', label: '运营配置8', icon: <Zap className="w-6 h-6 text-white" />, color: 'bg-indigo-400' },
];

// --- Components ---

const Header = ({ title, onBack, rightElement }: { title: string; onBack?: () => void; rightElement?: React.ReactNode }) => (
  <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center border-b border-gray-100">
    <div className="w-10 flex justify-start">
      {onBack && (
        <button onClick={onBack} className="p-1 -ml-1">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
      )}
    </div>
    <h1 className="flex-1 text-center text-lg font-medium text-gray-900 truncate px-2">
      {title}
    </h1>
    <div className="w-10 flex justify-end">
      {rightElement}
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle, extra }: { title: string; subtitle?: string; extra?: string }) => (
  <div className="px-4 py-4 flex justify-between items-end">
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
    </div>
    {extra && (
      <div className="flex items-center text-orange-500 text-sm font-medium">
        {extra} <ChevronRight className="w-4 h-4 ml-0.5" />
      </div>
    )}
  </div>
);

const TeacherCard = ({ name, country, lessons, students, rating, bio, seed }: { 
  name: string; 
  country: string; 
  lessons: number; 
  students: number; 
  rating: string; 
  bio: string; 
  seed: string;
}) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 mb-4">
    <div className="flex gap-4">
      <div className="relative">
        <img 
          src={`https://picsum.photos/seed/${seed}/120/120`} 
          alt="Teacher" 
          className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute -bottom-1 -left-1">
          <img src={`https://flagcdn.com/w20/${country}.png`} alt="Flag" className="w-5 rounded-sm shadow-sm" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-purple-100 rounded-full p-1">
          <Volume2 className="w-3 h-3 text-purple-600" />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <MessageCircle className="w-3 h-3" />
          <span>教学：英语 | 德语</span>
        </div>
        <div className="flex justify-between mt-3 text-center">
          <div>
            <p className="text-sm font-bold text-gray-900">{lessons}</p>
            <p className="text-[10px] text-gray-400">上课(次)</p>
          </div>
          <div className="w-px h-6 bg-gray-100 self-center"></div>
          <div>
            <p className="text-sm font-bold text-gray-900">{students}</p>
            <p className="text-[10px] text-gray-400">学生(个)</p>
          </div>
          <div className="w-px h-6 bg-gray-100 self-center"></div>
          <div>
            <p className="text-sm font-bold text-gray-900">{rating}</p>
            <p className="text-[10px] text-gray-400">好评率</p>
          </div>
        </div>
      </div>
    </div>
    <p className="mt-4 text-sm text-gray-600 leading-relaxed line-clamp-3">{bio}</p>
    <button className="mt-5 w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 active:bg-indigo-700">
      立即预约
    </button>
  </div>
);

// --- Page: Home ---

const HomePage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-white px-4 pt-4 pb-6">
        <div className="flex justify-between items-center mb-6">
          <ChevronLeft className="w-6 h-6 text-gray-800" />
          <div className="flex gap-8 text-lg font-medium text-gray-400">
            <span>课程</span>
            <span className="text-gray-900 border-b-2 border-orange-500 pb-1">外教课</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
             <Globe className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* King Kong Positions */}
        <div className="grid grid-cols-4 gap-y-6">
          {KING_KONG_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'oral') onNavigate('oral');
                if (item.id === 'ielts') onNavigate('ielts');
                if (item.id === 'study-abroad') onNavigate('study-abroad');
                if (item.id === 'minor-lang') onNavigate('minor-lang');
                if (item.id === 'ht-teachers') onNavigate('ht-teachers');
              }}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm relative`}>
                {item.icon}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-xs text-gray-700 font-medium text-center px-1">{item.label}</span>
                {item.id === 'ielts' && (
                  <div className="bg-orange-500 text-[8px] text-white font-bold px-1 rounded-full border border-white scale-90">
                    HOT
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <SectionTitle title="精选语伴" subtitle="每天15分钟，与专属语伴固定练习" />
      
      <div className="px-4">
        <div className="bg-emerald-500 rounded-2xl p-4 flex items-center relative overflow-hidden h-32">
          <div className="z-10">
            <p className="text-white text-sm opacity-90">15分钟地道韩语聊出来</p>
            <h3 className="text-white text-2xl font-bold mt-1 flex items-center">
              韩语精选语伴
              <div className="bg-white/20 rounded-full p-1 ml-2">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </h3>
          </div>
          <img 
            src="https://picsum.photos/seed/teacher/200/200" 
            alt="Teacher" 
            className="absolute right-0 bottom-0 w-32 h-32 object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      <SectionTitle title="语伴畅聊" subtitle="自由预约，不限语种不限语伴" extra="更多" />

      <div className="px-4 grid grid-cols-2 gap-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center text-center">
            <div className="relative">
              <img 
                src={`https://picsum.photos/seed/avatar${i}/150/150`} 
                alt="Avatar" 
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm">
                <img src="https://flagcdn.com/w20/us.png" alt="Flag" className="w-4" />
              </div>
            </div>
            <h4 className="mt-3 font-bold text-gray-900">{i === 1 ? 'Den' : 'Graeme'}</h4>
            <p className="text-xs text-gray-400 mt-1">英语/俄语</p>
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">Hello friends! I'm here to help...</p>
            <button className="mt-4 w-full py-2 bg-orange-50 rounded-full text-orange-500 text-sm font-bold active:bg-orange-100">
              立即预约
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Nav Placeholder */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 px-8 flex justify-center items-center">
        <div className="flex items-center gap-2 text-orange-500 font-bold">
          <BookOpen className="w-5 h-5" />
          <span>我的课表</span>
        </div>
      </div>
    </div>
  );
};

// --- Page: Course List ---

const CourseListPage = ({ 
  title, 
  mixedCourses, 
  recordedCourses, 
  onBack, 
  onSelectCourse,
  mixedTitle = "混播课"
}: { 
  title: string; 
  mixedCourses: Course[]; 
  recordedCourses: Course[]; 
  onBack: () => void; 
  onSelectCourse: (course: Course) => void;
  mixedTitle?: string;
}) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Header title={title} onBack={onBack} />
      
      {/* Banner */}
      <div className="px-4 py-4">
        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
          <img 
            src={`https://picsum.photos/seed/${title}/800/400`} 
            alt="Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Mixed Courses */}
      {mixedCourses.length > 0 && (
        <>
          <SectionTitle title={mixedTitle} />
          <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              {mixedCourses.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onSelectCourse(item)}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col justify-between min-h-[160px] relative overflow-hidden active:scale-95 transition-transform cursor-pointer"
                >
                  <div className="absolute -right-2 -top-2 opacity-5 text-6xl font-black select-none">
                    {item.icon || item.title[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 leading-snug">{item.title}</h4>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {item.tags?.map(tag => (
                        <span key={tag} className="px-1.5 py-0.5 border border-orange-200 text-[10px] text-orange-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full py-1.5 border border-orange-300 text-orange-400 text-xs rounded-full font-medium">
                      查看详情
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Recorded Courses */}
      {recordedCourses.length > 0 && (
        <>
          <SectionTitle title="录播课" extra="更多" />
          <div className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              {recordedCourses.map((item, idx) => (
                <div 
                  key={idx} 
                  onClick={() => onSelectCourse(item)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col active:scale-95 transition-transform cursor-pointer"
                >
                  <div className="relative aspect-video bg-gray-100">
                    <img src={`https://picsum.photos/seed/${item.seed || item.id}/400/225`} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-[2px]">
                        <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded-full backdrop-blur-sm">
                      {item.lessons || '32课时'}
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-tight">{item.title}</h4>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">录播课</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// --- Page: Course Detail ---

const CourseDetailPage = ({ course, onBack }: { course: Course; onBack: () => void }) => {
  const [showPayment, setShowPayment] = useState(false);
  const isIELTS = course.type === 'ielts';
  const isJapan = course.type === 'japan';
  const isKorea = course.type === 'korea';

  const painPoints = isIELTS ? [
    "每次考试口语总是5.5分，流利度、词汇、语法、发音总有一项拖后腿？",
    "回答生硬，逻辑跳跃，无法让考官理解你的真实水平？",
    "自学或大班课无法获得针对个人问题的精准指导，进步缓慢？"
  ] : isJapan ? [
    "单词背了忘，语法理不清，N1/N2/N3考试总是差那么几分？",
    "想去日本留学，却不知道如何规划，对申请流程一头雾水？",
    "哑巴日语，只会写不会说，无法与日本人进行顺畅交流？"
  ] : [
    "韩语发音不准，基础不牢，看韩剧还要盯着字幕？",
    "想考TOPIK，却不知道从何下手，缺乏系统的备考指导？",
    "生活口语匮乏，想去韩国旅游或留学，却不敢开口说话？"
  ];

  const solutionTitle = isIELTS ? "雅思口语考前直击" : isJapan ? "日语能力考冲刺" : "韩语全能提升";

  return (
    <div className="bg-gray-50 min-h-screen pb-10 relative">
      <Header 
        title={course.title} 
        onBack={onBack} 
        rightElement={
          <button className="p-1">
            <MessageSquare className="w-6 h-6 text-orange-500" />
          </button>
        }
      />

      {/* Course Card Horizontal */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 aspect-video bg-gray-100">
            <img 
              src={`https://picsum.photos/seed/${course.seed || 'course'}/400/225`} 
              alt="Course" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-6 h-6 text-white fill-white ml-1" />
              </div>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 leading-tight">{course.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{course.subtitle || '资深名师深度陪练，针对性突破薄弱项，助力高分'}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-orange-500 text-sm font-bold">¥</span>
                <span className="text-orange-500 text-2xl font-bold">{course.price || '399'}</span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <span>班次</span>
                <span>{course.lessons || '45课时'} | 报班即学 至 有效期90天</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button 
                onClick={() => setShowPayment(true)}
                className="w-full py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-orange-200 active:bg-orange-600"
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPayment(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl p-6 pb-10"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">选择支付方式</h3>
                <button onClick={() => setShowPayment(false)} className="text-gray-400">
                  <ChevronLeft className="w-6 h-6 rotate-[-90deg]" />
                </button>
              </div>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl active:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">微信支付</p>
                      <p className="text-xs text-gray-400">推荐微信用户使用</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-orange-500 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                  </div>
                </button>

                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl active:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-gray-900">支付宝支付</p>
                      <p className="text-xs text-gray-400">支持花呗分期</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
                </button>
              </div>

              <div className="mt-8 flex items-center justify-between px-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-gray-400 text-sm">合计:</span>
                  <span className="text-orange-500 text-sm font-bold">¥</span>
                  <span className="text-orange-500 text-2xl font-bold">{course.price || '399'}</span>
                </div>
                <button className="px-10 py-3 bg-orange-500 text-white rounded-full font-bold shadow-lg shadow-orange-200 active:bg-orange-600">
                  确认支付
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pain Points Section */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">你是否面临这些困境?</h3>
          <div className="space-y-5">
            {painPoints.map((text, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose-500 text-xs font-bold">!</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solution Banner */}
      <div className="px-4 mt-8">
        <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
          <div className="relative z-10">
            <p className="text-indigo-200 text-sm font-medium tracking-widest uppercase">这样的你适合</p>
            <h2 className="text-3xl font-black mt-2">沪江网校</h2>
            <h3 className="text-xl font-bold mt-1 text-indigo-100">{solutionTitle}</h3>
            <div className="mt-6 flex gap-4">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">考前直击</div>
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold border border-white/20">针对性提分</div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-indigo-50">
              助你构建即时应答能力与逻辑思维体系，从容应对各种难题
            </p>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Zap className="w-20 h-20 text-white" />
          </div>
        </div>
      </div>

      {/* Course Highlights */}
      <div className="px-4 mt-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">课程亮点</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: '资深名师', desc: '1V1能力提升陪练', icon: <Users className="w-5 h-5" /> },
            { title: '纠正文法', desc: '纠正发音语法', icon: <MessageSquare className="w-5 h-5" /> },
            { title: '提高流利度', desc: '梳理思路', icon: <Zap className="w-5 h-5" /> },
            { title: '优化思路', desc: '词汇句式升级', icon: <Star className="w-5 h-5" /> },
          ].map((item, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-50 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-3">
                {item.icon}
              </div>
              <h4 className="font-bold text-gray-900 text-sm">{item.title}</h4>
              <p className="text-[10px] text-gray-400 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-orange-500 rounded-2xl p-4 text-center shadow-lg shadow-orange-100">
          <p className="text-white font-black text-sm italic tracking-wide">
            ! 不是陪你聊天，是陪你提分
          </p>
        </div>
      </div>

      {/* Teacher Quality */}
      <div className="px-4 mt-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4">我们的师资</h3>
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-lg">全球教学资质认证</h4>
              <p className="text-xs text-gray-400">教学经验丰富，严选精英师资</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              isIELTS ? '来自英语为官方语言的国家' : isJapan ? '来自日本本土或拥有多年留日经验' : '来自韩国本土或拥有多年留韩经验',
              '拥有专业教学资质认证',
              '经过6层以上严格面试筛选',
              '经系统、专业培训后上岗',
              '学员真实评价考核，全程监督教学质量',
              '拥有专业的学历背景与丰富的授课经验'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full flex-shrink-0" />
                <span className="text-sm text-gray-600">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marketing Images Gallery */}
      <div className="px-4 mt-10 space-y-4">
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img src={`https://picsum.photos/seed/${course.seed}-m1/800/400`} alt="Marketing 1" className="w-full" referrerPolicy="no-referrer" />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img src={`https://picsum.photos/seed/${course.seed}-m2/800/400`} alt="Marketing 2" className="w-full" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>
  );
};

// --- Page: Japan Study --- (Removed specialized page)

// --- Page: HT Teachers ---

const HTTeachersPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Header title="HT-外教课程" onBack={onBack} />
      
      <SectionTitle title="推荐老师" subtitle="全球教学资质认证，教学经验丰富" />
      <div className="px-4">
        <TeacherCard 
          name="Kevin 外教老师" 
          country="us" 
          lessons={154} 
          students={12} 
          rating="98%" 
          bio="I am an American who has been teaching English since 1986, although I graduated university as a Math Major. I have a passion for helping students achieve their goals..."
          seed="kevin"
        />
        <TeacherCard 
          name="Sarah 雅思专家" 
          country="gb" 
          lessons={320} 
          students={45} 
          rating="99%" 
          bio="Specializing in IELTS speaking and writing for over 10 years. I have helped hundreds of students achieve Band 7.5 and above."
          seed="sarah"
        />
        <TeacherCard 
          name="David 口语教练" 
          country="au" 
          lessons={89} 
          students={8} 
          rating="95%" 
          bio="Focus on natural conversation and accent reduction. Let's make learning English fun and practical for your daily life."
          seed="david"
        />
        <TeacherCard 
          name="Emma 写作名师" 
          country="ca" 
          lessons={210} 
          students={30} 
          rating="97%" 
          bio="Expert in academic writing and structure. I provide detailed feedback to help you improve your logic and vocabulary."
          seed="emma"
        />
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [previousPage, setPreviousPage] = useState<Page>('home');

  const handleSelectCourse = (course: Course, from: Page) => {
    setSelectedCourse(course);
    setPreviousPage(from);
    setCurrentPage('course-detail');
  };

  const oralMixed: Course[] = [
    { id: 'oral-eu', title: '欧美外教1v1（所有课时包集合页）', tags: ['直播课', '欧美1v1'], icon: '欧', seed: 'oral-eu', type: 'oral' },
    { id: 'oral-ph', title: '菲律宾外教1v1（所有课时包集合页）', tags: ['直播课', '菲教1v1'], icon: '菲', seed: 'oral-ph', type: 'oral' },
    { id: 'oral-kids', title: 'kids外教1v1（所有课时包集合页）', tags: ['直播课', '少儿1v1'], icon: 'K', seed: 'oral-kids', type: 'oral' },
  ];
  const oralRec: Course[] = [
    { id: 'oral-biz', title: '流利商务口语', tags: ['录播课'], seed: 'oral-biz', type: 'oral' },
    { id: 'oral-life', title: '生活口语达人训练营', tags: ['录播课'], seed: 'oral-life', type: 'oral' },
  ];

  const ieltsMixed: Course[] = [];
  const ieltsRec: Course[] = [
    { id: 'ielts-hitalk', title: 'Hitalk雅思外教1v1口语陪练', tags: ['录播课', '口语陪练'], seed: 'ielts-hitalk', type: 'ielts' },
    { id: 'ielts-premium', title: '雅思1v1精品班（所有课时包集合页）', tags: ['录播课', '精品1v1'], seed: 'ielts-premium', type: 'ielts' },
    { id: 'ielts-vip', title: '雅思7分VIP班（定制班）', tags: ['录播课', '方案定制'], seed: 'ielts-vip', type: 'ielts' },
    { id: 'ielts-65', title: '初级水平直达雅思6.5分', tags: ['录播课'], seed: 'ielts-65', type: 'ielts' },
  ];

  const studyAbroadMixed: Course[] = [
    { id: 'jp-n1', title: '日语N1备考直通车（专项强化+刷题+直播押题）', tags: ['混播课', 'N1'], icon: 'N1', seed: 'jp-n1', type: 'japan' },
    { id: 'jp-n2', title: '日语N2备考直通车（专项强化+刷题+直播押题）', tags: ['混播课', 'N2'], icon: 'N2', seed: 'jp-n2', type: 'japan' },
    { id: 'jp-n3', title: '日语N3备考直通车（专项强化+刷题+直播押题）', tags: ['混播课', 'N3'], icon: 'N3', seed: 'jp-n3', type: 'japan' },
    { id: 'kr-vip-1v1', title: '韩语入门至初级VIP【1V1班】', tags: ['混播课', 'VIP'], icon: 'V', seed: 'kr-vip-1v1', type: 'korea' },
    { id: 'kr-vip-custom', title: '韩语入门至高级VIP【方案定制】', tags: ['混播课', '定制'], icon: '高', seed: 'kr-vip-custom', type: 'korea' },
    { id: 'kr-topik', title: '韩语入门至TOPIK中级【随到随学班】', tags: ['混播课', 'TOPIK'], icon: 'T', seed: 'kr-topik', type: 'korea' },
    { id: 'kr-1v1-custom', title: '韩语1V1【VIP定制班】', tags: ['混播课', '1V1'], icon: '1', seed: 'kr-1v1-custom', type: 'korea' },
  ];
  const studyAbroadRec: Course[] = [
    { id: 'jp-0-n1', title: '新编日语0-N1', tags: ['录播课'], seed: 'jp-0-n1', type: 'japan' },
    { id: 'jp-biz', title: '商务日语会话', tags: ['录播课'], seed: 'jp-biz', type: 'japan' },
    { id: 'jp-study-custom', title: '赴日留学安心定制班', tags: ['录播课'], seed: 'jp-study-custom', type: 'japan' },
    { id: 'kr-life-sale', title: '韩语生活会话入门至流畅【双年特惠班】', tags: ['录播课'], seed: 'kr-life-sale', type: 'korea' },
  ];

  const minorLangMixed: Course[] = [
    { id: 'fr-vip-custom', title: '法语零基础至中级（0-A2）VIP【方案定制班】', tags: ['混播课'], icon: '法', seed: 'fr-vip-custom', type: 'minor' },
    { id: 'es-vip-custom', title: '西语零起点至生活会话1V1强化【学习方案定制】', tags: ['混播课'], icon: '西', seed: 'es-vip-custom', type: 'minor' },
    { id: 'ru-vip-custom', title: '俄语(0-B2)尊享VIP【方案定制班】', tags: ['混播课'], icon: '俄', seed: 'ru-vip-custom', type: 'minor' },
    { id: 'fr-1v1', title: '法语1V1【VIP定制班】', tags: ['混播课'], icon: 'F', seed: 'fr-1v1', type: 'minor' },
    { id: 'de-1v1', title: '德语1V1【VIP定制班】', tags: ['混播课'], icon: 'D', seed: 'de-1v1', type: 'minor' },
    { id: 'es-1v1', title: '西班牙语1V1【VIP定制班】', tags: ['混播课'], icon: 'S', seed: 'es-1v1', type: 'minor' },
    { id: 'ru-1v1', title: '俄语1V1【VIP定制班】', tags: ['混播课'], icon: 'R', seed: 'ru-1v1', type: 'minor' },
    { id: 'it-1v1', title: '意大利语1V1【VIP定制班】', tags: ['混播课'], icon: 'I', seed: 'it-1v1', type: 'minor' },
    { id: 'th-1v1', title: '泰语1V1【VIP定制班】', tags: ['混播课'], icon: 'T', seed: 'th-1v1', type: 'minor' },
    { id: 'vi-1v1', title: '越南语1V1【VIP定制班】', tags: ['混播课'], icon: 'V', seed: 'vi-1v1', type: 'minor' },
    { id: 'ar-1v1', title: '阿拉伯语1V1【VIP定制班】', tags: ['混播课'], icon: 'A', seed: 'ar-1v1', type: 'minor' },
    { id: 'la-1v1', title: '拉丁语1V1【VIP定制班】', tags: ['混播课'], icon: 'L', seed: 'la-1v1', type: 'minor' },
    { id: 'yue-1v1', title: '粤语1V1【VIP定制班】', tags: ['混播课'], icon: 'Y', seed: 'yue-1v1', type: 'minor' },
  ];
  const minorLangRec: Course[] = [
    { id: 'fr-0-b2', title: 'E-French法语0-B2语法精讲【随到随学班】', tags: ['录播课'], seed: 'fr-0-b2', type: 'minor' },
    { id: 'de-0-b1', title: '新版德语零基础至中高级（0-B1）【随到随学班】', tags: ['录播课'], seed: 'de-0-b1', type: 'minor' },
    { id: 'es-0-a2', title: '【U-Spanish】西班牙语零起点至中级0-A2【随到随学班】', tags: ['录播课'], seed: 'es-0-a2', type: 'minor' },
    { id: 'ru-0-b1', title: '俄语(0-B1)零基础至中高级【随到随学班】', tags: ['录播课'], seed: 'ru-0-b1', type: 'minor' },
    { id: 'it-0-a2', title: '意大利语(0-A2)零起点至中级【随到随学班】', tags: ['录播课'], seed: 'it-0-a2', type: 'minor' },
  ];

  return (
    <div className="max-w-md mx-auto bg-white shadow-2xl min-h-screen relative overflow-x-hidden font-sans">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage onNavigate={setCurrentPage} />
          </motion.div>
        )}
        {currentPage === 'oral' && (
          <motion.div
            key="oral"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseListPage 
              title="英语口语"
              mixedCourses={oralMixed}
              recordedCourses={oralRec}
              mixedTitle="直播课"
              onBack={() => setCurrentPage('home')} 
              onSelectCourse={(c) => handleSelectCourse(c, 'oral')}
            />
          </motion.div>
        )}
        {currentPage === 'ielts' && (
          <motion.div
            key="ielts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseListPage 
              title="雅思课程"
              mixedCourses={ieltsMixed}
              recordedCourses={ieltsRec}
              onBack={() => setCurrentPage('home')} 
              onSelectCourse={(c) => handleSelectCourse(c, 'ielts')}
            />
          </motion.div>
        )}
        {currentPage === 'study-abroad' && (
          <motion.div
            key="study-abroad"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseListPage 
              title="日韩留学"
              mixedCourses={studyAbroadMixed}
              recordedCourses={studyAbroadRec}
              onBack={() => setCurrentPage('home')} 
              onSelectCourse={(c) => handleSelectCourse(c, 'study-abroad')}
            />
          </motion.div>
        )}
        {currentPage === 'minor-lang' && (
          <motion.div
            key="minor-lang"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseListPage 
              title="小语种课程"
              mixedCourses={minorLangMixed}
              recordedCourses={minorLangRec}
              onBack={() => setCurrentPage('home')} 
              onSelectCourse={(c) => handleSelectCourse(c, 'minor-lang')}
            />
          </motion.div>
        )}
        {currentPage === 'ht-teachers' && (
          <motion.div
            key="ht-teachers"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <HTTeachersPage onBack={() => setCurrentPage('home')} />
          </motion.div>
        )}
        {currentPage === 'course-detail' && selectedCourse && (
          <motion.div
            key="course-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <CourseDetailPage 
              course={selectedCourse} 
              onBack={() => setCurrentPage(previousPage)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
