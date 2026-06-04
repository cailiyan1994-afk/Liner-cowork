export const generateEventTitle = (host: Host) => {
  if (host.name.includes("TechGuru")) return "产品狗与硬核极客的科技玩具评测";
  if (host.name.includes("乐山咔饼")) return "产品经理与北漂打工人的深夜食堂";
  if (host.name.includes("Music_Alice")) return "下班打工人的治愈系音乐与萌宠时间";
  if (host.name.includes("彭乔治")) return "户外撒野与松弛感生活茶话会";
  if (host.name.includes("Gamer_Bob")) return "白天写PRD晚上打游戏的解压局";
  if (host.name.includes("Nastia")) return "苦逼产品与修仙运营的深夜吐槽局";
  if (host.name.includes("Art_Diana")) return "汪星人VD的专属二次元形象首秀";
  if (host.name.includes("Life_Ethan")) return "周末逃离城市：修勾与满级装备的露营";
  return "带狗户外闲聊 Space:@vdmom";
};

export interface Host {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  tags: string[];
  relationship: string;
  commonTrait: string;
  complementary: string;
  aiReason: string;
  hasLikedYou?: boolean;
  prefilledMessage?: string;
  prefilledEvent?: {
    title: string;
    time: string;
  };
}

export const SWIPED_HOSTS = new Set<string>();

export const MOCK_HOSTS: Host[] = [
  {
    id: "h1",
    name: "TechGuru_Tim",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/535fd043e8331b85dee9a9e853edd8a93e0092978ffc5a8c28e7a19057914704.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/535fd043e8331b85dee9a9e853edd8a93e0092978ffc5a8c28e7a19057914704.png",
    tags: ["硬核极客", "同城高玩"],
    relationship: "默默看过你 5 次直播",
    commonTrait: "互联网搬砖人",
    complementary: "科技前沿",
    aiReason: "都是互联网圈的打工人！你是产品经理，TA是硬核极客。这周末不如直接把PRD一扔，带着VD大王一起去评测新出的科技玩具？"
  },
  {
    id: "h6",
    name: "一定会复刻最美味的乐山咔饼",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/b2026e2df7a48a159b33726aa5bd99f96a265770219484344b0f5be81bcb4b54.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/b2026e2df7a48a159b33726aa5bd99f96a265770219484344b0f5be81bcb4b54.png",
    tags: ["吃货日常", "猫奴"],
    relationship: "同在一家公会群里",
    commonTrait: "北漂打工人",
    complementary: "猫狗双全",
    aiReason: "都在北京苦苦打拼！你周末遛VD，她在家里给猫主子做四川美味。要是能让VD和她的猪咪连麦，还能顺便骗点夜宵吃吃！"
  },
  {
    id: "h2",
    name: "Music_Alice",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/259f01ca9bb439767a94ded82cebf4e46954cd3dc7b7cccad7e6f7327745d2ca.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/259f01ca9bb439767a94ded82cebf4e46954cd3dc7b7cccad7e6f7327745d2ca.png",
    tags: ["灵魂唱将", "宝藏女孩"],
    relationship: "在你的直播间送过小心心",
    commonTrait: "治愈系画风",
    complementary: "催眠好声音",
    aiReason: "你带着傻萌的VD直播，TA唱着治愈的歌。要是你们俩能连麦，绝对能让下班累成狗的打工人们彻底放松下来！"
  },
  {
    id: "h7",
    name: "1娃3猫饲养员彭乔治",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/b8cd4cf61694676f8dfcf9ca5dd0a7ba030b4ea7d9a77d07efac9e4110f733a7.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/b8cd4cf61694676f8dfcf9ca5dd0a7ba030b4ea7d9a77d07efac9e4110f733a7.png",
    tags: ["佛系带娃", "攀岩老手"],
    relationship: "曾把你的户外直播分享给朋友",
    commonTrait: "热爱自然",
    complementary: "vibe coding领域的刘姥姥",
    aiReason: "你带着VD在户外撒野，TA喜欢喝茶攀岩！聊聊养宠物心得和松弛感生活，你们俩绝对一拍即合。"
  },
  {
    id: "h3",
    name: "Gamer_Bob",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/b9270048830b16cd8923fea1d926f00b772df2a66b01252e945a0864e78e34db.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/b9270048830b16cd8923fea1d926f00b772df2a66b01252e945a0864e78e34db.png",
    tags: ["修仙党", "主机狂热粉"],
    relationship: "你们有 15% 的重合粉丝",
    commonTrait: "急需解压",
    complementary: "反差萌",
    aiReason: "你白天写PRD，TA晚上疯狂打游戏，都是急需解压的人！下次打游戏的时候，让VD大王在一旁当啦啦队怎么样？"
  },
  {
    id: "h8",
    name: "Nastia",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/bb12be80aab0eddb28e7dada5fc17b025b2431a51d0423b94e5ee357505f0fbe.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/bb12be80aab0eddb28e7dada5fc17b025b2431a51d0423b94e5ee357505f0fbe.png",
    tags: ["修仙党", "互联网运营"],
    relationship: "经常在同样的深夜时段在线",
    commonTrait: "大厂打工人",
    complementary: "产品遇到运营",
    aiReason: "你是苦逼产品经理，TA是常年睡不醒的运营，正好可以凑在一起吐槽工作、分享夜宵攻略！让活力四射的VD来治愈TA吧。",
    hasLikedYou: true,
    prefilledMessage: "哈喽～同为大厂搬砖人，我看你的VD超可爱，这周末要不要带着它来我的直播间一起吐槽下奇葩需求？顺便给你看个好东西~",
    prefilledEvent: {
      title: "苦逼产品与修仙运营的深夜吐槽局",
      time: "今天 23:30"
    }
  },
  {
    id: "h4",
    name: "Art_Diana",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/f395625da3f6c920498e7fb86d2c023f70af18bc8c4d56bd802ec2c2d45bc39c.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/f395625da3f6c920498e7fb86d2c023f70af18bc8c4d56bd802ec2c2d45bc39c.png",
    tags: ["神仙画师", "二次元"],
    relationship: "曾评论过 VD 超级可爱",
    commonTrait: "吸狗达人",
    complementary: "手绘大触",
    aiReason: "TA居然悄悄画过VD的草图！如果能邀请这位神仙画师来直播间，给VD画一个专属的二次元形象，效果绝对拉满！"
  },
  {
    id: "h5",
    name: "Life_Ethan",
    avatar: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/6024ae33a73339baf1cf37a8e77aff38074b61f4ea2e0efd6b6302500de34a87.png",
    coverImage: "https://cdn-tos-cn.bytedance.net/obj/tiktok-web-ai-cn/6024ae33a73339baf1cf37a8e77aff38074b61f4ea2e0efd6b6302500de34a87.png",
    tags: ["户外老手", "生活家"],
    relationship: "经常在同城户外热榜上偶遇",
    commonTrait: "周末逃离城市",
    complementary: "满级装备",
    aiReason: "都喜欢周末去户外撒野。TA有满级的野外生存装备，你有无敌可爱的修勾。这不就是完美的周末露营搭子吗？"
  }
];