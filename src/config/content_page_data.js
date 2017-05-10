/**
  *  1. goodthing (type = show)                                http://c.diaox2.com/view/app/?m=show&id=9669
  *  2. firstpage (type = show)                                http://c.diaox2.com/view/app/?m=show&id=5344
  *  3. experience (type = show)                               http://c.diaox2.com/view/app/?m=show&id=1022
  *  4. zhuankan (type = zhuankan) 文章集合                     http://c.diaox2.com/view/app/?m=zk&id=3053
  *  5. zhuanti (type = zhuanti from 7017) 文章集合             http://c.diaox2.com/view/app/?m=zt&id=7080
  *  6. scene (type = scene)线上原来出现过，但是现在没用过了      http://c.diaox2.com/view/app/?m=scene&id=3045
 */
// 文章类型：1-首页/2-好物/3-专刊/4-活动/5-经验/7-值得买/8-评测/9-专题
export const ctypes =  [{
  label: '首页',
  value: 1
}, {
  label: '好物',
  value: 2
}, {
  label: '专刊',
  value: 3
}, {
  label: '活动',
  value: 4
}, {
  label: '经验',
  value: 5
}, {
  label: '值得买',
  value: 7
}, {
  label: '评测',
  value: 8
}, {
  label: '专题',
  value: 9
}
// ,{
//   label: '场景',
//   value: 6
// }
]

// export const rules = {
//   aName: [
//     { required: true, message: '请输入作者', trigger: 'blur' }
//   ],
//   keywords: [
//     { required: true, message: '请选择活动区域', trigger: 'change' }
//   ],
//   timetopublish: [
//     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
//   ],
//   ctype: [
//     { required: true, message: '请选择文章类型', trigger: 'change' }
//   ]
// }
