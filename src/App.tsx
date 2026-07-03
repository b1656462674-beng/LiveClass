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
  Volume2,
  LayoutList,
  Grid
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

// --- Course Metadata Generator (Udemy Style, Reference Image 1) ---

const getCourseMeta = (course: Course) => {
  const hash = course.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const teachers = [
    "Michael Tang", "Sarah Jenkins", "Prof. Kenji Sato", "Ji-Woo Park", 
    "Elena Petrova", "Dr. Hans Müller", "Sofia Rodriguez", "Claire Dubois",
    "John Davis", "Lisa Marie", "Yuki Tanaka", "Min-Ho Kim"
  ];
  const ratings = [4.6, 4.7, 4.8, 4.9];
  const reviewCounts = [124, 340, 609, 973, 1502, 843, 620];
  
  const teacher = teachers[hash % teachers.length];
  const rating = ratings[hash % ratings.length];
  const count = reviewCounts[hash % reviewCounts.length];
  const avatarSeed = `teacher_${hash % 10}`;
  
  return { teacher, rating, count, avatarSeed };
};

// --- Custom Star Rating Component (Reference Image 1) ---

const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      <span className="font-bold text-amber-600 text-xs mr-1">{rating.toFixed(1)}</span>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${
              i < fullStars 
                ? "text-amber-500 fill-amber-500" 
                : "text-gray-200"
            }`} 
          />
        ))}
      </div>
      <span className="text-gray-400 text-[10px] ml-1">({count}评价)</span>
    </div>
  );
};

// --- Highly Curated Course Image Mapper based on course IDs (Unsplash, strictly educational/topic-focused) ---

const getCourseImage = (id: string) => {
  const imageMap: { [key: string]: string } = {
    // Oral courses
    'oral-eu': 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400&h=225', // Online teacher video call
    'oral-ph': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=225', // Smiling online coach
    'oral-kids': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400&h=225', // Child with headphones studying
    'oral-biz': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400&h=225', // Professional business desk / teamwork
    'oral-life': 'https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&q=80&w=400&h=225', // Friends speaking / cafe chatting
    
    // IELTS courses
    'ielts-hitalk': 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400&h=225', // Notebook & textbook study
    'ielts-premium': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=225', // Pen on exam paper / test prep
    'ielts-vip': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&h=225', // Dedicated study desk
    'ielts-65': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=225', // Laptop typing / focus
    
    // Japanese courses
    'jp-n1': 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400&h=225', // Tokyo city cherry blossoms
    'jp-n2': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&q=80&w=400&h=225', // Shibuya intersection / modern Tokyo study
    'jp-n3': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=400&h=225', // Tokyo Tower
    'jp-0-n1': 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400&h=225', // High-end clean classroom
    'jp-biz': 'https://images.unsplash.com/photo-1491975458574-c902e556e481?auto=format&fit=crop&q=80&w=400&h=225', // Corporate office desk
    'jp-study-custom': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400&h=225', // Premium college library
    
    // Korean courses
    'kr-vip-1v1': 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400&h=225', // Seoul lights
    'kr-vip-custom': 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=400&h=225', // Korean street city design
    'kr-topik': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400&h=225', // Group of students studying together
    'kr-1v1-custom': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=225', // VIP tailored learning
    'kr-life-sale': 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&q=80&w=400&h=225', // Modern cafe dialogue
    
    // Minor languages
    'fr-vip-custom': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400&h=225', // Paris street cafe
    'es-vip-custom': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400&h=225', // Barcelona style arch / street
    'ru-vip-custom': 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=400&h=225', // University study desk
    'fr-1v1': 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&q=80&w=400&h=225', // France scenery / language textbook look
    'de-1v1': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=400&h=225', // Germany cozy town
    'es-1v1': 'https://images.unsplash.com/photo-1509840144524-a292d3c6fa4c?auto=format&fit=crop&q=80&w=400&h=225', // Spain bright style
    'ru-1v1': 'https://images.unsplash.com/photo-1547483238-2cbf88bc1463?auto=format&fit=crop&q=80&w=400&h=225', // Study setup
    'it-1v1': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400&h=225', // Rome skyline
    'th-1v1': 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&q=80&w=400&h=225', // Modern library
    'vi-1v1': 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=400&h=225', // Beautiful study place
    'ar-1v1': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400&h=225', // Workspace flatlay
    'la-1v1': 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=400&h=225', // Classical books
    'yue-1v1': 'https://images.unsplash.com/photo-1507504038482-762104524ef5?auto=format&fit=crop&q=80&w=400&h=225', // Hong Kong skyline study context
    
    // Minor language recorded
    'fr-0-b2': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=400&h=225', // Paris
    'de-0-b1': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=400&h=225', // Germany
    'es-0-a2': 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400&h=225', // Spain
    'ru-0-b1': 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&q=80&w=400&h=225', // Russian study
    'it-0-a2': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400&h=225', // Italy
  };
  return imageMap[id] || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=400&h=225'; // Fallback study desk
};

const getThumbnailLabel = (item: Course) => {
  if (item.id.includes('jp')) return '日语备考';
  if (item.id.includes('kr')) return '韩语备考';
  if (item.id.includes('ielts')) return '雅思考试';
  if (item.id.includes('oral')) return '口语突破';
  if (item.id.includes('fr')) return '法语精修';
  if (item.id.includes('de')) return '德语精修';
  if (item.id.includes('es')) return '西语精修';
  if (item.id.includes('ru')) return '俄语精修';
  return '精选小语种';
};

const getCourseDescription = (course: Course) => {
  if (course.subtitle) return course.subtitle;
  const id = course.id;
  if (id === 'oral-eu') return '欧美母语外教1对1，浸入式语言环境，打造纯正发音。';
  if (id === 'oral-ph') return '超高性价比菲律宾外教，高频互动练习，突破口语瓶颈。';
  if (id === 'oral-kids') return '少儿趣味互动1对1，精选优质外教，激发孩子语言天赋。';
  if (id === 'oral-life') return '生活情景口语实战，轻松幽默氛围，零基础学员口语救星。';
  if (id === 'oral-biz') return '职场商务沟通特训，掌握谈判汇报技巧，提升职场竞争力。';
  if (id === 'ielts-65') return '雅思核心基础班，全科考点精讲，助力基础薄弱直达6.5。';
  if (id === 'ielts-hitalk') return '外教1对1精细陪练与写作精批，突破口语写作单项弱势。';
  if (id === 'ielts-premium') return '雅思VIP一对一特训，专属定制提分方案，目标高分直达。';
  if (id === 'ielts-vip') return '全程名师督学与精细化方案定制，全方位锁定雅思7.0+。';
  if (id === 'jp-n1') return '日语N1冲刺班，历年真题精解+高频词汇语法点专项辅导。';
  if (id === 'jp-n2') return '日语N2高效过级班，听说读写全面巩固，强化刷题冲刺。';
  if (id === 'jp-n3') return '日语N3巩固提高，零基础无缝衔接，奠定扎实中级基础。';
  if (id === 'jp-0-n1') return '新编日语0-N1长线通关，系统精讲，零基础学员直达高级。';
  if (id === 'jp-biz') return '商务日语实战，掌握日企社交礼仪与敬语表达，即学即用。';
  if (id === 'jp-study-custom') return '赴日留学一站式申请辅导，名校定制班型，安全省心。';
  if (id === 'kr-vip-1v1') return '韩语1对1精细班，名师中韩双语授课，快速掌握日常交流。';
  if (id === 'kr-vip-custom') return '韩语入门到高级全程定制，专属学习方案，满足个性化需求。';
  if (id === 'kr-topik') return 'TOPIK中高级考前强化，历年真题精细剖析，高效拿证。';
  if (id === 'kr-1v1-custom') return '韩语一对一VIP定制，专注攻克发音与会话，实现无障碍交流。';
  if (id === 'kr-life-sale') return '韩语生活场景会话，高频词汇句型演练，轻松对话无压力。';
  if (id === 'fr-vip-custom') return '法语0-A2全程VIP方案定制，法语名师保驾护航。';
  if (id === 'es-vip-custom') return '西班牙语1对1零起点，实用生活场景，轻松掌握基础沟通。';
  if (id === 'fr-1v1') return '法语外教1对1口语突破，个性化高频互动，提升口语自信。';
  if (id === 'de-1v1') return '德语1对1欧标进阶课程，针对性辅导，攻克语法难关。';
  if (id === 'es-1v1') return '西班牙语一对一，资深外教在线纠音，流利说西语。';
  if (id === 'it-1v1') return '意大利语1对1，针对艺术留学、面签进行精准提升。';
  if (id === 'fr-0-b2') return '法语0-B2阶梯精讲，涵盖所有核心语法与高频话题。';
  if (id === 'de-0-b1') return '德语0-B1长线通关，零起点随到随学，名师系统精讲。';
  if (id === 'es-0-a2') return '西班牙语零起点快速通关，核心会话句式与实用文化。';
  if (id === 'it-0-a2') return '意大利语日常口语与文化精解，轻松掌握A2欧标内容。';
  if (id === 'ru-vip-custom') return '俄语高阶VIP定制班，资深外教与中教联合，打造卓越口语。';
  if (id === 'ru-1v1') return '俄语一对一特训，针对性极强，突破难点句型与发音。';
  if (id === 'th-1v1') return '泰语1对1日常会话，风趣幽默外教，快速融入泰国文化。';
  if (id === 'vi-1v1') return '越南语外贸口语，专注实用经贸场景与日常词汇。';
  if (id === 'ar-1v1') return '阿拉伯语高端1对1，标准语精讲，学术与商务场景。';
  if (id === 'la-1v1') return '拉丁语经典进修班，精细研读古典文献与核心语法。';
  if (id === 'yue-1v1') return '粤语日常发音与交流速成，港乐港片场景，轻松开口。';
  if (id === 'ru-0-b1') return '俄语0-B1随到随学，包含基础发音、句法与高频词汇。';
  return '精选名师定制课程，资深中外教全天候辅导，全面提分。';
};

// --- Premium Course Card (Reference Image 1) ---

const CourseCard = ({ 
  item, 
  onClick, 
  isMixed = false, 
  isSingleColumn = true 
}: { 
  item: Course; 
  onClick: () => void; 
  isMixed?: boolean; 
  isSingleColumn?: boolean;
  key?: React.Key 
}) => {
  const { rating, count } = getCourseMeta(item);

  if (isSingleColumn) {
    return (
      <div 
        onClick={onClick}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100/60 shadow-[0_4px_16px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300 flex p-2.5 gap-3 cursor-pointer hover:translate-y-[-1px] relative group w-full"
      >
        {/* Left Thumbnail Box (Square Aspect) */}
        <div className="relative w-22 h-22 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden shadow-xs">
          <img 
            src={getCourseImage(item.id)} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            referrerPolicy="no-referrer" 
          />
          
          {/* Play Icon overlay for recorded courses */}
          {!isMixed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
              <div className="w-7 h-7 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-sm">
                <Play className="w-3 h-3 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Right Course Details Block */}
        <div className="flex-1 flex flex-col justify-between min-w-0 h-22">
          <div>
            {/* Bold 1 or 2 line wrapped title */}
            <h4 className="text-[13px] font-bold text-gray-900 leading-snug line-clamp-1 tracking-tight group-hover:text-orange-500 transition-colors">
              {item.title}
            </h4>

            {/* Gray course introduction - maximum 1 line */}
            <p className="text-[11px] text-gray-500 mt-0.5 truncate leading-relaxed">
              {getCourseDescription(item)}
            </p>
            
            {/* Tag row with styled badges side-by-side */}
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              {item.tags
                ?.filter(tag => tag !== '直播课' && tag !== '录播课' && tag !== '混播课')
                ?.slice(0, 3)
                .map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="inline-block border border-rose-100 bg-rose-50/50 text-rose-500 text-[9px] font-semibold px-1.5 py-0.2 rounded"
                  >
                    {tag}
                  </span>
                ))
              }
            </div>
          </div>

          {/* Bottom pricing row */}
          <div className="flex items-center justify-between border-t border-gray-50 pt-1">
            <span className="text-orange-500 font-extrabold text-[13px] tracking-tight flex items-baseline gap-0.5">
              <span className="text-[9px] font-bold">¥</span>
              {item.price || '399'}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              {item.lessons || '32课时'}
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    // Two-column grid layout (一行双课)
    return (
      <div 
        onClick={onClick}
        className="bg-white rounded-2xl overflow-hidden border border-gray-100/60 shadow-[0_4px_12px_rgba(0,0,0,0.015)] hover:shadow-md transition-all duration-300 flex flex-col p-2.5 cursor-pointer hover:translate-y-[-1px] relative group w-full"
      >
        {/* Top Thumbnail Box (16:9 Aspect) */}
        <div className="relative aspect-video w-full bg-gray-50 rounded-xl overflow-hidden shadow-xs flex-shrink-0 mb-2">
          <img 
            src={getCourseImage(item.id)} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            referrerPolicy="no-referrer" 
          />
          
          {/* Play Icon overlay for recorded courses */}
          {!isMixed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-all">
              <div className="w-7 h-7 bg-black/40 rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-sm">
                <Play className="w-3 h-3 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Course Details Block */}
        <div className="flex-1 flex flex-col justify-between min-w-0 px-1 pb-1">
          <div>
            {/* Bold 2-line wrapped title */}
            <h4 className="text-[11px] font-bold text-gray-900 leading-snug line-clamp-2 tracking-tight group-hover:text-orange-500 transition-colors">
              {item.title}
            </h4>

            {/* Gray course introduction - maximum 1 line */}
            <p className="text-[9px] text-gray-500/90 mt-0.5 truncate leading-relaxed">
              {getCourseDescription(item)}
            </p>
            
            {/* Tag row with styled badges side-by-side */}
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              {item.tags
                ?.filter(tag => tag !== '直播课' && tag !== '录播课' && tag !== '混播课')
                ?.slice(0, 3)
                .map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="inline-block border border-rose-100 bg-rose-50 text-rose-500 text-[8px] font-extrabold px-1 py-0.2 rounded"
                  >
                    {tag}
                  </span>
                ))
              }
            </div>
          </div>

          {/* Bottom pricing row */}
          <div className="flex items-center justify-between border-t border-gray-50 pt-1.5 mt-2">
            <span className="text-orange-500 font-extrabold text-[12px] tracking-tight flex items-baseline gap-0.5">
              <span className="text-[9px] font-bold">¥</span>
              {item.price || '399'}
            </span>
            <span className="text-[8px] text-gray-400">
              {item.lessons || '32课时'}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

const getBannerImage = (title: string) => {
  if (title === "英语口语") {
    return "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=280&h=280";
  } else if (title === "雅思课程") {
    return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=280&h=280";
  } else if (title === "日韩留学") {
    return "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=280&h=280"; // Tokyo scenery
  } else if (title === "小语种课程") {
    return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=280&h=280"; // Language study globe
  }
  return "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=280&h=280";
};

// --- Custom Styled Premium Banners (Reference Image 1 & User Request) ---

const CourseListBanner = ({ title, onClick }: { title: string; onClick?: () => void }) => {
  let gradient = "from-indigo-600 via-indigo-700 to-violet-800";
  let mainTitle = "1v1 地道口语特训班";
  let badgeText = "ENG TALK";
  let subtitle = "纯正母语外教 · 24h自由预约 · 场景实战体系";
  
  if (title === "英语口语") {
    gradient = "from-indigo-600 via-violet-700 to-purple-800";
    mainTitle = "1v1 地道口语特训班";
    badgeText = "ENG TALK";
    subtitle = "纯正母语外教 · 24h自由预约 · 场景实战体系";
  } else if (title === "雅思课程") {
    gradient = "from-purple-700 via-indigo-800 to-pink-700";
    mainTitle = "雅思全科口语考前直击";
    badgeText = "IELTS 7.5+";
    subtitle = "历年真题精准预测 · 独家答题模板 · 考官双重精批";
  } else if (title === "日韩留学") {
    gradient = "from-rose-500 via-orange-500 to-amber-500";
    mainTitle = "日韩名校申请直通车";
    badgeText = "JP/KR STUDY";
    subtitle = "0基础直达高级 · EJU/TOPIK提分 · 1v1安心申请规划";
  } else if (title === "小语种课程") {
    gradient = "from-emerald-600 via-teal-700 to-cyan-600";
    mainTitle = "多语种高能会话精品班";
    badgeText = "MULTILINGUAL";
    subtitle = "法/德/西/俄/意 欧标认证师资 · 1v1实战强效提分";
  }

  const bannerImg = getBannerImage(title);

  return (
    <div className="px-4 py-4">
      <div 
        onClick={onClick}
        className={`w-full bg-gradient-to-r ${gradient} rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-indigo-100/10 min-h-[140px] flex items-center justify-between cursor-pointer hover:brightness-105 active:scale-[0.99] transition-all duration-300 group/banner`}
      >
        {/* Abstract decorative elements */}
        <div className="absolute right-[-10px] top-[-10px] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-[30%] bottom-[-20px] w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative z-10 max-w-[65%]">
          <span className="inline-block bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-extrabold border border-white/20 tracking-wider uppercase mb-2">
            {badgeText}
          </span>
          <h2 className="text-xl font-black tracking-tight leading-tight mb-1 group-hover/banner:text-orange-100 transition-colors">{mainTitle}</h2>
          <p className="text-[11px] text-white/80 leading-relaxed font-medium">
            {subtitle}
          </p>
        </div>

        {/* Beautiful right-aligned rounded photo illustrating the course category */}
        <div className="relative z-10 w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden border border-white/20 shadow-sm">
          <img 
            src={bannerImg} 
            alt={title} 
            className="w-full h-full object-cover group-hover/banner:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};

// --- Section Header with Avatar Stack (Reference Image 2) ---

const SectionTitleWithAvatars = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="px-4 py-4 flex justify-between items-center">
      <div className="flex-1 min-w-0 pr-2">
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h2>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{subtitle}</p>
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0 bg-white border border-gray-100/80 px-2 py-1 rounded-full shadow-xs">
        <div className="flex -space-x-1.5">
          <img className="w-5 h-5 rounded-full border border-white object-cover shadow-xs" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=60&h=60" alt="" referrerPolicy="no-referrer" />
          <img className="w-5 h-5 rounded-full border border-white object-cover shadow-xs" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=60&h=60" alt="" referrerPolicy="no-referrer" />
          <img className="w-5 h-5 rounded-full border border-white object-cover shadow-xs" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60&h=60" alt="" referrerPolicy="no-referrer" />
        </div>
        <span className="text-[10px] text-gray-400 font-bold tracking-tight">15022</span>
      </div>
    </div>
  );
};

// --- Custom King Kong Positions Mapper (Reference Image 2) ---

const getKingKongStyle = (id: string) => {
  switch (id) {
    case 'oral':
      return {
        bg: "bg-gradient-to-br from-violet-600 to-purple-700 shadow-purple-100",
        icon: <div className="text-white font-black text-xl tracking-tighter select-none font-sans">Aa</div>,
        badge: null
      };
    case 'ielts':
      return {
        bg: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-orange-100",
        icon: <MessageSquare className="w-7 h-7 text-white fill-white/10" />,
        badge: null
      };
    case 'study-abroad':
      return {
        bg: "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-100",
        icon: <Users className="w-7 h-7 text-white fill-white/10" />,
        badge: null
      };
    case 'minor-lang':
      return {
        bg: "bg-gradient-to-br from-cyan-400 to-teal-500 shadow-teal-100",
        icon: <Play className="w-6 h-6 text-white fill-white ml-0.5" />,
        badge: null
      };
    case 'op3':
      return {
        bg: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-teal-100",
        icon: <Settings className="w-6 h-6 text-white" />,
        badge: null
      };
    case 'ht-teachers':
      return {
        bg: "bg-gradient-to-br from-orange-400 to-amber-500 shadow-orange-100",
        icon: <Star className="w-6 h-6 text-white fill-white" />,
        badge: null
      };
    case 'op4':
      return {
        bg: "bg-gradient-to-br from-rose-400 to-pink-500 shadow-pink-100",
        icon: <Heart className="w-6 h-6 text-white fill-white" />,
        badge: null
      };
    case 'op8':
      return {
        bg: "bg-gradient-to-br from-indigo-500 to-blue-600 shadow-blue-100",
        icon: <Zap className="w-6 h-6 text-white fill-white" />,
        badge: null
      };
    default:
      return {
        bg: "bg-blue-500",
        icon: <Globe className="w-6 h-6 text-white" />,
        badge: null
      };
  }
};

// --- Page: Home (Reference Image 2) ---

const HomePage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-white px-4 pt-4 pb-6 rounded-b-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.015)] border-b border-gray-100/50">
        
        {/* Navigation Tabs Header */}
        <div className="flex justify-between items-center mb-6 px-1">
          <ChevronLeft className="w-6 h-6 text-gray-800 cursor-pointer hover:scale-105 transition-transform" />
          <div className="flex gap-8 text-lg font-bold">
            <span className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors">课程</span>
            <span className="text-gray-900 border-b-[3px] border-orange-500 pb-1 cursor-pointer font-bold relative">
              外教课
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 flex items-center justify-center shadow-xs overflow-hidden border-2 border-white cursor-pointer hover:scale-105 transition-transform">
             <Globe className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Categories Grid (King Kong positions) */}
        <div className="grid grid-cols-4 gap-y-6">
          {KING_KONG_ITEMS.map((item) => {
            const style = getKingKongStyle(item.id);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'oral') onNavigate('oral');
                  if (item.id === 'ielts') onNavigate('ielts');
                  if (item.id === 'study-abroad') onNavigate('study-abroad');
                  if (item.id === 'minor-lang') onNavigate('minor-lang');
                  if (item.id === 'ht-teachers') onNavigate('ht-teachers');
                }}
                className="flex flex-col items-center gap-2 active:scale-95 transition-transform group"
              >
                <div className={`${style.bg} w-14 h-14 rounded-[22px] flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.04)] relative transition-all duration-300 hover:translate-y-[-2px]`}>
                  {style.icon}
                  {style.badge}
                </div>
                <span className="text-[11px] text-gray-700 font-bold text-center px-1 group-hover:text-orange-500 transition-colors">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Section */}
      <SectionTitleWithAvatars title="精选语伴" subtitle="每天15分钟，和母语语伴固定练习" />
      
      {/* Featured Language Partner Slide/Banner */}
      <div className="px-4">
        <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl p-5 flex items-center justify-between relative overflow-hidden h-32 shadow-md shadow-emerald-100/50 hover:scale-[1.01] transition-transform cursor-pointer">
          {/* Decorative shapes */}
          <div className="absolute left-[-20px] top-[-20px] w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute right-[20%] bottom-[-10px] w-32 h-32 bg-emerald-400/20 rounded-full blur-xl pointer-events-none" />
          
          <div className="z-10 flex flex-col justify-center h-full">
            <p className="text-white/80 text-xs font-semibold tracking-wide uppercase mb-1">15分钟地道韩语聊出来</p>
            <h3 className="text-white text-xl font-extrabold flex items-center gap-1.5">
              韩语精选语伴
              <div className="bg-rose-500 rounded-full p-1 shadow-md shadow-rose-950/20 hover:scale-110 transition-transform flex items-center justify-center">
                <ChevronRight className="w-3.5 h-3.5 text-white stroke-[3px]" />
              </div>
            </h3>
          </div>
          
          <div className="absolute right-0 bottom-0 top-0 w-36 flex items-end justify-end pointer-events-none select-none">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250&h=250" 
              alt="Korean Tutor" 
              className="w-full h-full object-cover object-top filter drop-shadow-md rounded-br-3xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Chat Partners Section */}
      <SectionTitle title="语伴畅聊" subtitle="自由预约，不限语种不限语伴" extra="更多" />

      {/* Tutors Grid (Side-by-side design from Image 2) */}
      <div className="px-4 grid grid-cols-2 gap-4">
        {[
          {
            name: "Den",
            languages: "英语/俄语",
            flag: "us",
            bio: "Hello friends! 👋 Let's practice speaking naturally.",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
          },
          {
            name: "Graeme Carling",
            languages: "英语",
            flag: "gb",
            bio: "Hey all, I'm Graeme. Fun and practical english sessions!",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
          }
        ].map((tutor, i) => (
          <div key={i} className="bg-white rounded-3xl p-5 border border-gray-100/60 shadow-[0_4px_18px_rgba(0,0,0,0.015)] flex flex-col items-center text-center relative hover:shadow-md transition-all duration-300">
            {/* Top Right Speaker Icon */}
            <div className="absolute top-4 right-4 text-gray-300 hover:text-orange-400 cursor-pointer transition-colors">
              <Volume2 className="w-5 h-5" />
            </div>

            {/* Circular Avatar with Floating Flag */}
            <div className="relative mt-2">
              <img 
                src={tutor.avatar} 
                alt={tutor.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 bg-white rounded-full p-1 shadow-md border border-gray-50 flex items-center justify-center">
                <img src={`https://flagcdn.com/w20/${tutor.flag}.png`} alt="Flag" className="w-4 h-3 rounded-xs object-cover" />
              </div>
            </div>

            {/* Name */}
            <h4 className="mt-3.5 font-bold text-gray-900 text-sm tracking-tight">{tutor.name}</h4>
            
            {/* Languages Badge */}
            <div className="bg-gray-100/80 text-gray-500 px-3 py-0.5 rounded-full text-[10px] font-semibold mt-1.5 tracking-wide">
              {tutor.languages}
            </div>

            {/* Bio Message */}
            <p className="text-[11px] text-gray-400 mt-2.5 line-clamp-2 h-8 leading-snug w-full px-1">
              {tutor.bio}
            </p>

            {/* Booking Button */}
            <button className="mt-4 w-full py-2 bg-orange-50/80 hover:bg-orange-100 text-orange-600 rounded-2xl text-[11px] font-bold tracking-wide active:scale-95 transition-all duration-200">
              立即预约
            </button>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Nav Bar styled like Image 2 */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100/80 py-3 px-6 flex justify-center items-center shadow-[0_-8px_30px_rgba(0,0,0,0.03)] z-40">
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 text-orange-600 px-6 py-2 rounded-full font-extrabold shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer">
          <BookOpen className="w-4 h-4 text-orange-500 stroke-[2.5px]" />
          <span className="text-xs tracking-wider">我的课表</span>
        </div>
      </div>
    </div>
  );
};

interface CourseGroup {
  title: string;
  courses: Course[];
}

const CourseListPage = ({ 
  title, 
  groups, 
  onBack, 
  onSelectCourse
}: { 
  title: string; 
  groups: CourseGroup[]; 
  onBack: () => void; 
  onSelectCourse: (course: Course) => void;
}) => {
  const [isSingleColumn, setIsSingleColumn] = useState(true);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Header 
        title={title} 
        onBack={onBack} 
        rightElement={
          <button 
            onClick={() => setIsSingleColumn(!isSingleColumn)}
            className="p-2 rounded-xl bg-orange-50 border border-orange-100 hover:bg-orange-100/70 text-orange-600 transition-all duration-200 flex items-center justify-center shadow-xs active:scale-95"
            title={isSingleColumn ? "切换到一行双课" : "切换到一行一课"}
          >
            {isSingleColumn ? (
              <Grid className="w-4 h-4" />
            ) : (
              <LayoutList className="w-4 h-4" />
            )}
          </button>
        }
      />
      
      {/* Custom styled beautiful banner based on the active category */}
      <CourseListBanner 
        title={title} 
        onClick={() => {
          const firstCourse = groups[0]?.courses[0];
          if (firstCourse) {
            onSelectCourse(firstCourse);
          }
        }}
      />

      {/* Render each course group dynamically */}
      {groups.map((group, groupIdx) => (
        <div key={groupIdx} className="mb-4">
          <SectionTitle title={group.title} />
          {isSingleColumn ? (
            <div className="px-4 space-y-4">
              {group.courses.map((item, idx) => (
                <CourseCard 
                  key={idx} 
                  item={item} 
                  onClick={() => onSelectCourse(item)} 
                  isMixed={item.tags?.includes('直播课') || item.tags?.includes('混播课') || item.id.includes('eu') || item.id.includes('ph') || item.id.includes('kids') || item.id.includes('vip')} 
                  isSingleColumn={true}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 grid grid-cols-2 gap-4">
              {group.courses.map((item, idx) => (
                <CourseCard 
                  key={idx} 
                  item={item} 
                  onClick={() => onSelectCourse(item)} 
                  isMixed={item.tags?.includes('直播课') || item.tags?.includes('混播课') || item.id.includes('eu') || item.id.includes('ph') || item.id.includes('kids') || item.id.includes('vip')} 
                  isSingleColumn={false}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Page: Course Detail ---

const CourseDetailPage = ({ course, onBack }: { course: Course; onBack: () => void }) => {
  const [showPayment, setShowPayment] = useState(false);
  const isIELTS = course.type === 'ielts';
  const isJapan = course.type === 'japan';
  const isKorea = course.type === 'korea';

  const { rating, count } = getCourseMeta(course);

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
              src={getCourseImage(course.id)} 
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
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{getCourseDescription(course)}</p>

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
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800&h=400" alt="Marketing 1" className="w-full" referrerPolicy="no-referrer" />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm">
          <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=400" alt="Marketing 2" className="w-full" referrerPolicy="no-referrer" />
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

  const oralGroups: CourseGroup[] = [
    {
      title: "外教1V1定制课程",
      courses: [
        { id: 'oral-eu', title: '欧美外教1v1（所有课时包集合页）', tags: ['直播课', '欧美1v1', '母语外教'], icon: '欧', seed: 'oral-eu', type: 'oral' },
        { id: 'oral-ph', title: '菲律宾外教1v1（所有课时包集合页）', tags: ['直播课', '高性价比'], icon: '菲', seed: 'oral-ph', type: 'oral' },
      ]
    },
    {
      title: "少儿与日常口语",
      courses: [
        { id: 'oral-kids', title: 'kids外教1v1（所有课时包集合页）', tags: ['直播课', '少儿1v1'], icon: 'K', seed: 'oral-kids', type: 'oral' },
        { id: 'oral-life', title: '生活口语达人训练营', tags: ['录播课', '日常情景', '零基础友好'], seed: 'oral-life', type: 'oral' },
      ]
    },
    {
      title: "商务口语提分",
      courses: [
        { id: 'oral-biz', title: '流利商务口语', tags: ['录播课', '职场晋升'], seed: 'oral-biz', type: 'oral' },
      ]
    }
  ];

  const ieltsGroups: CourseGroup[] = [
    {
      title: "初级水平基础班",
      courses: [
        { id: 'ielts-65', title: '初级水平直达雅思6.5分', tags: ['录播课', '基础特训'], seed: 'ielts-65', type: 'ielts' },
      ]
    },
    {
      title: "中高级考前提分",
      courses: [
        { id: 'ielts-hitalk', title: 'Hitalk雅思外教1v1口语陪练', tags: ['录播课', '口语陪练', '外教精批'], seed: 'ielts-hitalk', type: 'ielts' },
        { id: 'ielts-premium', title: '雅思1v1精品班（所有课时包集合页）', tags: ['录播课', '精品1v1'], seed: 'ielts-premium', type: 'ielts' },
      ]
    },
    {
      title: "全程方案定制",
      courses: [
        { id: 'ielts-vip', title: '雅思7分VIP班（定制班）', tags: ['录播课', '方案定制', '全程督学'], seed: 'ielts-vip', type: 'ielts' },
      ]
    }
  ];

  const studyAbroadGroups: CourseGroup[] = [
    {
      title: "日本留学推荐",
      courses: [
        { id: 'jp-n1', title: '日语N1备考直通车（专项强化+刷题+直播押题）', tags: ['混播课', 'N1辅导'], icon: 'N1', seed: 'jp-n1', type: 'japan' },
        { id: 'jp-n2', title: '日语N2备考直通车（专项强化+刷题+直播押题）', tags: ['混播课', 'N2备考', '冲刺推荐'], icon: 'N2', seed: 'jp-n2', type: 'japan' },
        { id: 'jp-n3', title: '日语N3备考直通车（专项强化+刷题+直播押题）', tags: ['混播课', 'N3强化'], icon: 'N3', seed: 'jp-n3', type: 'japan' },
        { id: 'jp-0-n1', title: '新编日语0-N1', tags: ['录播课', '零基础通关', '系统精讲'], seed: 'jp-0-n1', type: 'japan' },
        { id: 'jp-biz', title: '商务日语会话', tags: ['录播课', '实用口语'], seed: 'jp-biz', type: 'japan' },
        { id: 'jp-study-custom', title: '赴日留学安心定制班', tags: ['录播课', '定制班型', '名校申请'], seed: 'jp-study-custom', type: 'japan' },
      ]
    },
    {
      title: "韩国留学推荐",
      courses: [
        { id: 'kr-vip-1v1', title: '韩语入门至初级VIP【1V1班】', tags: ['混播课', '韩语入门'], icon: 'V', seed: 'kr-vip-1v1', type: 'korea' },
        { id: 'kr-vip-custom', title: '韩语入门至高级VIP【方案定制】', tags: ['混播课', '高级VIP', '名师伴学'], icon: '高', seed: 'kr-vip-custom', type: 'korea' },
        { id: 'kr-topik', title: '韩语入门至TOPIK中级【随到随学班】', tags: ['混播课', 'TOPIK突破'], icon: 'T', seed: 'kr-topik', type: 'korea' },
        { id: 'kr-1v1-custom', title: '韩语1V1【VIP定制班】', tags: ['混播课', '1v1定制', '口语强化'], icon: '1', seed: 'kr-1v1-custom', type: 'korea' },
        { id: 'kr-life-sale', title: '韩语生活会话入门至流畅【双年特惠班】', tags: ['录播课', '生活会话'], seed: 'kr-life-sale', type: 'korea' },
      ]
    }
  ];

  const minorLangGroups: CourseGroup[] = [
    {
      title: "西法德意欧标班",
      courses: [
        { id: 'fr-vip-custom', title: '法语零基础至中级（0-A2）VIP【方案定制班】', tags: ['混播课', '法语VIP'], icon: '法', seed: 'fr-vip-custom', type: 'minor' },
        { id: 'es-vip-custom', title: '西语零起点至生活会话1V1强化【学习方案定制】', tags: ['混播课', '西语VIP', '日常实用'], icon: '西', seed: 'es-vip-custom', type: 'minor' },
        { id: 'fr-1v1', title: '法语1V1【VIP定制班】', tags: ['混播课', '名师陪练'], icon: 'F', seed: 'fr-1v1', type: 'minor' },
        { id: 'de-1v1', title: '德语1V1【VIP定制班】', tags: ['混播课', '德语1v1', '欧标特训'], icon: 'D', seed: 'de-1v1', type: 'minor' },
        { id: 'es-1v1', title: '西班牙语1V1【VIP定制班】', tags: ['混播课', '口语流利'], icon: 'S', seed: 'es-1v1', type: 'minor' },
        { id: 'it-1v1', title: '意大利语1V1【VIP定制班】', tags: ['混播课', '意语1v1', '艺术留学'], icon: 'I', seed: 'it-1v1', type: 'minor' },
        { id: 'fr-0-b2', title: 'E-French法语0-B2语法精讲【随到随学班】', tags: ['录播课', '随到随学'], seed: 'fr-0-b2', type: 'minor' },
        { id: 'de-0-b1', title: '新版德语零基础至中高级（0-B1）【随到随学班】', tags: ['录播课', '随到随学', '系统课程'], seed: 'de-0-b1', type: 'minor' },
        { id: 'es-0-a2', title: '【U-Spanish】西班牙语零起点至中级0-A2【随到随学班】', tags: ['录播课', '会话提升'], seed: 'es-0-a2', type: 'minor' },
        { id: 'it-0-a2', title: '意大利语(0-A2)零起点至中级【随到随学班】', tags: ['录播课', '随到随学', '日常会话'], seed: 'it-0-a2', type: 'minor' },
      ]
    },
    {
      title: "俄泰越阿等精品班",
      courses: [
        { id: 'ru-vip-custom', title: '俄语(0-B2)尊享VIP【方案定制班】', tags: ['混播课', '俄语VIP'], icon: '俄', seed: 'ru-vip-custom', type: 'minor' },
        { id: 'ru-1v1', title: '俄语1V1【VIP定制班】', tags: ['混播课', '俄语1v1', '专属督学'], icon: 'R', seed: 'ru-1v1', type: 'minor' },
        { id: 'th-1v1', title: '泰语1V1【VIP定制班】', tags: ['混播课', '趣味泰语'], icon: 'T', seed: 'th-1v1', type: 'minor' },
        { id: 'vi-1v1', title: '越南语1V1【VIP定制班】', tags: ['混播课', '越语1v1', '外贸口语'], icon: 'V', seed: 'vi-1v1', type: 'minor' },
        { id: 'ar-1v1', title: '阿拉伯语1V1【VIP定制班】', tags: ['混播课', '高端定制'], icon: 'A', seed: 'ar-1v1', type: 'minor' },
        { id: 'la-1v1', title: '拉丁语1V1【VIP定制班】', tags: ['混播课', '拉丁1v1', '学术进修'], icon: 'L', seed: 'la-1v1', type: 'minor' },
        { id: 'yue-1v1', title: '粤语1V1【VIP定制班】', tags: ['混播课', '发音速成'], icon: 'Y', seed: 'yue-1v1', type: 'minor' },
        { id: 'ru-0-b1', title: '俄语(0-B1)零基础至中高级【随到随学班】', tags: ['录播课', '俄语精讲', '随到随学'], seed: 'ru-0-b1', type: 'minor' },
      ]
    }
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
              groups={oralGroups}
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
              groups={ieltsGroups}
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
              groups={studyAbroadGroups}
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
              groups={minorLangGroups}
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
