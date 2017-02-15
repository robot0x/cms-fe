export const tags = [{
  label: '家具家装',
  id: '0',
  // '家具','家纺布艺','家装软饰','照明灯具','香氛香薰','绿植盆栽'
  children: [
    {label: '家具', id:'0-0'},
    {label: '家纺布艺', id:"0-1"},
    {label: '家装软饰', id:'0-2'},
    {label: '照明灯具', id:'0-3'},
    {label: '香氛香薰', id:'0-4'},
    {label: '绿植盆栽', id:'0-5'}
  ]
}, {
  label: '生活日用',
  id:'1',
  // '餐具厨具','清洁用品','收纳整理','卫浴用品','雨伞雨具','钟表','宠物用品','家用工具'
  children: [
  {label: '餐具厨具', id:'1-0'},
  {label: '清洁用品', id:'1-1'},
  {label: '收纳整理', id:'1-2'},
  {label: '卫浴用品', id:'1-3'},
  {label: '雨伞雨具', id:'1-4'},
  {label: '钟表',     id:'1-5'},
  {label: '宠物用品', id:'1-6'},
  {label: '家用工具', id:'1-7'}]
}, {
  label: '家用电器',
  id:'2',
  // '生活电器','厨房电器','大家电'
  children: [
    {label: '生活电器', id:'2-0'},
    {label: '厨房电器', id:'2-1'},
    {label: '大家电', id:'2-2'}]
}, {
  label: '办公用品',
  id:'3',
  // '文具','办公工具','办公设备'
  children: [
  {label: '文具', id:'3-0'},
  {label: '办公工具', id:'3-1'},
  {label: '办公设备', id:'3-2'}]
}, {
  label: '时尚悦己',
  id:'4',
  // '女性时尚','男性时尚','箱包配饰'
  children: [
  {label: '女性时尚', id:'4-0'},
  {label: '男性时尚', id:'4-1'},
  {label: '箱包配饰', id:'4-2'}]
}, {
  label: '个护化妆',
  id:'5',
  // '口腔护理','头发护理','身体护理','面部护肤','香水彩妆','美容工具'
  children: [{label: '口腔护理', id:'5-0'},
  {label: '头发护理', id:'5-1'},
  {label: '身体护理', id:'5-2'},
  {label: '面部护肤', id:'5-3'},
  {label: '香水彩妆', id:'5-4'},
  {label: '美容工具', id:'5-5'}]
}, {
  label: '科技数码',
  id:'6',
  // '手机周边','电脑周边','音乐设备','照相摄影','智能设备'
  children: [{label: '手机周边', id:'6-0'},
  {label: '电脑周边', id:'6-1'},
  {label: '音乐设备', id:'6-2'},
  {label: '照相摄影', id:'6-3'},
  {label: '智能设备', id:'6-4'}]
}, {
  label: '运动健康',
  id:'7',
  // '运动装备','健身器材','健身常识','医药保健'
  children: [{label: '运动装备', id:'7-0'},
  {label: '健身器材', id:'7-1'},
  {label: '健身常识', id:'7-2'},
  {label: '医药保健', id:'7-3'}]
}, {
  label: '吃喝旅行',
  id:'8',
  // '饮食文化','休闲零食','茶酒咖啡','旅行用品','旅游攻略'
  children: [{label: '饮食文化', id:'8-0'}, {label: '休闲零食', id:'8-1'}, {label: '茶酒咖啡', id:'8-2'}, {label: '旅行用品', id:'8-3'}, {label: '旅游攻略', id:'8-4'}]
}, {
  label: '母婴玩具',
  id:'9',
  // '母婴用品','玩具周边'
  children: [{label: '母婴用品', id: '9-0'}, {label: '玩具周边', id: '9-1'}]
}, {
  label: '汽车户外',
  id:'10',
  // '汽车用品','户外用品'
  children: [{label: '汽车用品', id:'10-0'}, {label: '户外用品', id:'10-1'}]
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
