/**
  *  1. goodthing (type = show)                                http://c.diaox2.com/view/app/?m=show&id=9669
  *  2. firstpage (type = show)                                http://c.diaox2.com/view/app/?m=show&id=5344
  *  3. experience (type = show)                               http://c.diaox2.com/view/app/?m=show&id=1022
  *  4. zhuankan (type = zhuankan) 文章集合                     http://c.diaox2.com/view/app/?m=zk&id=3053
  *  5. zhuanti (type = zhuanti from 7017) 文章集合             http://c.diaox2.com/view/app/?m=zt&id=7080
  *  6. scene (type = scene)线上原来出现过，但是现在没用过了      http://c.diaox2.com/view/app/?m=scene&id=3045
 */
// 文章类型：1-首页/2-好物/3-专刊/4-活动/5-经验/7-值得买/8-评测/9-专题
export const ctypes = [
  {
    label: '首页',
    value: 1
  },
  {
    label: '好物',
    value: 2
  },
  {
    label: '专刊',
    value: 3
  },
  {
    label: '活动',
    value: 4
  },
  // 原来的经验其实不是5，老CMS中，ctype为5的类型为coupon
  // 但是一直没有用过，未来也不会用的，所以我就把ctype为5，定义为经验了
  // 未来，其实我们不会在生产 “经验” 这种文章了，但是为了兼容老的内容，还是有必要显示的
  {
    label: '经验',
    value: 5
  },
  // {
  //   label: '值得买',
  //   value: 7
  // }, {
  //   label: '评测',
  //   value: 8
  // },
  {
    label: '专题',
    value: 9
  },
  {
    label: '评测集合',
    value: 10
  }
  // ,{
  //   label: '场景',
  //   value: 6
  // }
];

export const all_tags = [
  {
    tid: 100000,
    name: '母婴玩具',
    children: [
      { tid: 100001, name: '母婴用品', id: '0-0' },
      { tid: 100002, name: '玩具周边', id: '0-1' }
    ],
    id: '0'
  },
  {
    tid: 100003,
    name: '家居家装',
    children: [
      { tid: 100004, name: '家具', id: '1-0' },
      { tid: 100005, name: '家纺布艺', id: '1-1' },
      { tid: 100006, name: '香氛香薰', id: '1-2' },
      { tid: 100007, name: '家装软饰', id: '1-3' },
      { tid: 100008, name: '照明灯具', id: '1-4' },
      { tid: 100063, name: '绿植盆栽', id: '1-5' }
    ],
    id: '1'
  },
  {
    tid: 100009,
    name: '个护化妆',
    children: [
      { tid: 100010, name: '口腔护理', id: '2-0' },
      { tid: 100011, name: '头发护理', id: '2-1' },
      { tid: 100012, name: '身体护理', id: '2-2' },
      { tid: 100013, name: '面部护肤', id: '2-3' },
      { tid: 100014, name: '香水彩妆', id: '2-4' },
      { tid: 100015, name: '美容工具', id: '2-5' }
    ],
    id: '2'
  },
  {
    tid: 100016,
    name: '办公用品',
    children: [
      { tid: 100017, name: '办公设备', id: '3-0' },
      { tid: 100018, name: '文具', id: '3-1' },
      { tid: 100019, name: '办公工具', id: '3-2' }
    ],
    id: '3'
  },
  {
    tid: 100020,
    name: '汽车户外',
    children: [
      { tid: 100021, name: '汽车用品', id: '4-0' },
      { tid: 100022, name: '户外用品', id: '4-1' }
    ],
    id: '4'
  },
  {
    tid: 100023,
    name: '时尚悦己',
    children: [
      { tid: 100024, name: '女性时尚', id: '5-0' },
      { tid: 100025, name: '男性时尚', id: '5-1' },
      { tid: 100026, name: '箱包配饰', id: '5-2' }
    ],
    id: '5'
  },
  {
    tid: 100027,
    name: '吃喝旅行',
    children: [
      { tid: 100028, name: '饮食文化', id: '6-0' },
      { tid: 100029, name: '休闲零食', id: '6-1' },
      { tid: 100030, name: '旅行用品', id: '6-2' },
      { tid: 100031, name: '旅游攻略', id: '6-3' },
      { tid: 100032, name: '茶酒咖啡', id: '6-4' }
    ],
    id: '6'
  },
  {
    tid: 100033,
    name: '生活日用',
    children: [
      { tid: 100034, name: '清洁用品', id: '7-0' },
      { tid: 100035, name: '餐具厨具', id: '7-1' },
      { tid: 100036, name: '收纳整理', id: '7-2' },
      { tid: 100037, name: '卫浴用品', id: '7-3' },
      { tid: 100038, name: '家用工具', id: '7-4' },
      { tid: 100039, name: '雨伞雨具', id: '7-5' },
      { tid: 100040, name: '钟表', id: '7-6' },
      { tid: 100041, name: '宠物用品', id: '7-7' }
    ],
    id: '7'
  },
  {
    tid: 100042,
    name: '家用电器',
    children: [
      { tid: 100043, name: '大家电', id: '8-0' },
      { tid: 100044, name: '厨房电器', id: '8-1' },
      { tid: 100045, name: '生活电器', id: '8-2' }
    ],
    id: '8'
  },
  {
    tid: 100046,
    name: '运动健康',
    children: [
      { tid: 100047, name: '运动装备', id: '9-0' },
      { tid: 100048, name: '健身器材', id: '9-1' },
      { tid: 100049, name: '健身常识', id: '9-2' },
      { tid: 100050, name: '医药保健', id: '9-3' }
    ],
    id: '9'
  },
  {
    tid: 100051,
    name: '科技数码',
    children: [
      { tid: 100052, name: '手机周边', id: '10-0' },
      { tid: 100053, name: '电脑周边', id: '10-1' },
      { tid: 100054, name: '音乐设备', id: '10-2' },
      { tid: 100055, name: '照相摄影', id: '10-3' },
      { tid: 100056, name: '智能设备', id: '10-4' }
    ],
    id: '10'
  },
  {
    tid: 100064,
    name: '有调专栏',
    children: [
      { tid: 100065, name: '福来day', id: '11-0' },
      { tid: 100066, name: '评测团', id: '11-1' },
      { tid: 100067, name: '好物开箱秀', id: '11-2' },
      { tid: 100068, name: '精品购', id: '11-3' },
      { tid: 100069, name: '女神进化论', id: '11-4' },
      { tid: 100070, name: '极客小黑屋', id: '11-5' },
      { tid: 100071, name: '极致好品牌', id: '11-6' },
      { tid: 100072, name: '情趣研究所', id: '11-7' },
      { tid: 100073, name: '有调读书社', id: '11-8' },
      { tid: 100074, name: '值得买特刊', id: '11-9' },
      { tid: 100075, name: '每日专刊', id: '11-10' },
      { tid: 100076, name: '型男养成记', id: '11-11' },
      { tid: 100077, name: '推广', id: '11-12' },
      { tid: 100078, name: '评测团报告', id: '11-13' },
      { tid: 100079, name: '家居新主张', id: '11-14' },
      { tid: 100080, name: '甩肉者联盟', id: '11-15' },
      { tid: 100081, name: '有调精选', id: '11-16' },
      { tid: 100082, name: '本土原创派', id: '11-17' },
      { tid: 100083, name: '有调评测', id: '11-18' },
      { tid: 100084, name: '洋货探宝记', id: '11-19' },
      { tid: 100085, name: '大家说', id: '11-20' },
      { tid: 100086, name: '十日谈', id: '11-21' },
      { tid: 100087, name: '礼物清单', id: '11-22' },
      { tid: 100088, name: '年度榜单', id: '11-23' }
    ],
    id: '11'
  }
]
