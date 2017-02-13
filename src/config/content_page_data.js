export const tags = [{
  label: '家具家装',
  // '家具','家纺布艺','家装软饰','照明灯具','香氛香薰','绿植盆栽'
  children: [{label: '家具'}, {label: '家纺布艺'}, {label: '家装软饰'}, {label: '照明灯具'}, {label: '香氛香薰'}, {label: '绿植盆栽'}]
}, {
  label: '生活日用',
  // '餐具厨具','清洁用品','收纳整理','卫浴用品','雨伞雨具','钟表','宠物用品','家用工具'
  children: [{label: '餐具厨具'}, {label: '清洁用品'}, {label: '收纳整理'},
  {label: '卫浴用品'}, {label: '雨伞雨具'}, {label: '钟表'}, {label: '宠物用品'}, {label: '家用工具'}]
}, {
  label: '家用电器',
  // '生活电器','厨房电器','大家电'
  children: [{label: '生活电器'}, {label: '厨房电器'}, {label: '大家电'}]
}, {
  label: '办公用品',
  // '文具','办公工具','办公设备'
  children: [{label: '文具'}, {label: '办公工具'}, {label: '办公设备'}]
}, {
  label: '时尚悦己',
  // '女性时尚','男性时尚','箱包配饰'
  children: [{label: '女性时尚'}, {label: '男性时尚'}, {label: '箱包配饰'}]
}, {
  label: '个护化妆',
  // '口腔护理','头发护理','身体护理','面部护肤','香水彩妆','美容工具'
  children: [{label: '口腔护理'}, {label: '头发护理'}, {label: '身体护理'}, {label: '面部护肤'}, {label: '香水彩妆'}, {label: '美容工具'}]
}, {
  label: '科技数码',
  // '手机周边','电脑周边','音乐设备','照相摄影','智能设备'
  children: [{label: '手机周边'}, {label: '电脑周边'}, {label: '音乐设备'}, {label: '照相摄影'}, {label: '智能设备'}]
}, {
  label: '运动健康',
  // '运动装备','健身器材','健身常识','医药保健'
  children: [{label: '运动装备'}, {label: '健身器材'}, {label: '健身常识'}, {label: '医药保健'}]
}, {
  label: '吃喝旅行',
  // '饮食文化','休闲零食','茶酒咖啡','旅行用品','旅游攻略'
  children: [{label: '饮食文化'}, {label: '休闲零食'}, {label: '茶酒咖啡'}, {label: '旅行用品'}, {label: '旅游攻略'}]
}, {
  label: '母婴玩具',
  // '母婴用品','玩具周边'
  children: [{label: '母婴用品'}, {label: '玩具周边'}]
}, {
  label: '汽车户外',
  // '汽车用品','户外用品'
  children: [{label: '汽车用品'}, {label: '户外用品'}]
}]

export const ctypes =  [{
  label: '好物',
  value: 0
},{
  label: '专刊',
  value: 1
},{
  label: '专题',
  value: 2
},{
  label: '首页',
  value: 3
},{
  label: '测评',
  value: 4
},{
  label: '长文',
  value: 5
}]

export const rules = {
  aName: [
    { required: true, message: '请输入作者', trigger: 'blur' }
  ],
  keywords: [
    { required: true, message: '请选择活动区域', trigger: 'change' }
  ],
  timetopublish: [
    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  ],
  ctype: [
    { required: true, message: '请选择文章类型', trigger: 'change' }
  ]
}
