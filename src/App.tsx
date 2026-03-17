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

type Page = 'home' | 'ielts' | 'japan';

interface KingKongItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

// --- Constants ---

const KING_KONG_ITEMS: KingKongItem[] = [
  { id: 'ielts', label: '雅思备考', icon: <BookOpen className="w-6 h-6 text-white" />, color: 'bg-purple-500' },
  { id: 'japan', label: '日本留学', icon: <Globe className="w-6 h-6 text-white" />, color: 'bg-yellow-500' },
  { id: 'kids', label: '少儿英语', icon: <Baby className="w-6 h-6 text-white" />, color: 'bg-pink-500' },
  { id: 'oral', label: '日常口语', icon: <MessageCircle className="w-6 h-6 text-white" />, color: 'bg-blue-400' },
  { id: 'op5', label: '运营配置5', icon: <Settings className="w-6 h-6 text-white" />, color: 'bg-emerald-500' },
  { id: 'op6', label: '运营配置6', icon: <Star className="w-6 h-6 text-white" />, color: 'bg-orange-400' },
  { id: 'op7', label: '运营配置7', icon: <Heart className="w-6 h-6 text-white" />, color: 'bg-rose-400' },
  { id: 'op8', label: '运营配置8', icon: <Zap className="w-6 h-6 text-white" />, color: 'bg-indigo-400' },
];

// --- Components ---

const Header = ({ title, onBack }: { title: string; onBack?: () => void }) => (
  <div className="sticky top-0 z-50 bg-white px-4 py-3 flex items-center border-b border-gray-100">
    {onBack && (
      <button onClick={onBack} className="p-1 -ml-1">
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
    )}
    <h1 className="flex-1 text-center text-lg font-medium text-gray-900 mr-6">
      {title}
    </h1>
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
                if (item.id === 'ielts') onNavigate('ielts');
                if (item.id === 'japan') onNavigate('japan');
              }}
              className="flex flex-col items-center gap-2 active:scale-95 transition-transform relative"
            >
              <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}>
                {item.icon}
              </div>
              {item.id === 'ielts' && (
                <div className="absolute -top-1 -left-1 bg-orange-500 text-[8px] text-white font-bold px-1 rounded-full border border-white">
                  HOT
                </div>
              )}
              <span className="text-xs text-gray-700 font-medium">{item.label}</span>
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

// --- Page: IELTS Prep ---

const IELTSPrepPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Header title="雅思备考" onBack={onBack} />

      {/* Course Card Horizontal (Fig 2) */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/2 aspect-video bg-gray-100">
            <img 
              src="https://picsum.photos/seed/course1/400/225" 
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
              <h3 className="text-lg font-bold text-gray-900 leading-tight">简单高效的自然拼读课</h3>
              <p className="text-xs text-gray-400 mt-1">看字读音，听音拼字，简单易上手的自然拼读法</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-orange-500 text-sm font-bold">¥</span>
                <span className="text-orange-500 text-2xl font-bold">399</span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <span>班次</span>
                <span>45课时 | 报班即学 至 有效期90天</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button className="flex-1 py-2.5 bg-orange-500 text-white rounded-lg font-bold text-sm shadow-lg shadow-orange-200 active:bg-orange-600">
                立即购买
              </button>
              <button className="flex-1 py-2.5 border border-orange-500 text-orange-500 rounded-lg font-bold text-sm active:bg-orange-50">
                课程咨询
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Recommendations (Fig 4) */}
      <SectionTitle title="推荐老师" />
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

// --- Page: Japan Study ---

const JapanStudyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Header title="日本留学" onBack={onBack} />

      {/* Banner */}
      <div className="px-4 py-4">
        <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-md">
          <img 
            src="https://picsum.photos/seed/japan-banner/800/400" 
            alt="Japan Banner" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Course Grid (8 items) */}
      <SectionTitle title="精选课程" />
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { title: '日语零基础入门', tags: ['N5', '五十音'], icon: 'あ' },
            { title: '赴日读研全攻略', tags: ['研究生', 'SGU'], icon: '学' },
            { title: '日本语言学校申请', tags: ['签证', '面试'], icon: '签' },
            { title: 'EJU留考数学特训', tags: ['理科', '文科'], icon: '数' },
            { title: '日语N2考前冲刺', tags: ['词汇', '语法'], icon: '考' },
            { title: '日本名校直通车', tags: ['东大', '早大'], icon: '名' },
            { title: '日语口语实战营', tags: ['外教', '1V1'], icon: '说' },
            { title: '日本文化体验课', tags: ['茶道', '动漫'], icon: '文' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 flex flex-col justify-between min-h-[160px] relative overflow-hidden">
               <div className="absolute -right-2 -top-2 opacity-5 text-6xl font-black select-none">
                 {item.icon}
               </div>
               <div>
                <h4 className="text-sm font-bold text-gray-800 leading-snug">{item.title}</h4>
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 border border-orange-200 text-[10px] text-orange-400 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
               </div>
               <div className="mt-4">
                 <button className="w-full py-1.5 border border-orange-300 text-orange-400 text-xs rounded-full font-medium active:bg-orange-50">
                   查看详情
                 </button>
                 <div className="mt-2 pt-2 border-t border-gray-50 flex justify-between items-center text-[10px] text-gray-400">
                   <span>好评率: 98%</span>
                   <div className="flex items-center gap-0.5">
                     <MessageSquare className="w-3 h-3" />
                     <span>免费咨询</span>
                   </div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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
        {currentPage === 'ielts' && (
          <motion.div
            key="ielts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <IELTSPrepPage onBack={() => setCurrentPage('home')} />
          </motion.div>
        )}
        {currentPage === 'japan' && (
          <motion.div
            key="japan"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <JapanStudyPage onBack={() => setCurrentPage('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
