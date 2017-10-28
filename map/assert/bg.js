(function(){
  const $ = id => document.getElementById(id)
  const $ = function(id){
    return document.getElementById(id);
  }
  function $(id){return document.getElementById(id)};
  // 景点的坐标,模拟gps坐标系
  const sightList = [{
    id: 1,
    name: '景点a',
    desc: '景点a描述',
    image: './assert/sight.jpg',
    left: 1010,
    top: 200
  },{
    id: 2,
    name: '景点b',
    desc: '景点b描述',
    image: './assert/sight.jpg',
    left: 1100,
    top: 310
  },{
    id: 3,
    name: '景点c',
    desc: '景点c描述',
    image: './assert/sight.jpg',
    left: 980,
    top: 680
  },{
    id: 4,
    name: '景点d',
    desc: '景点d描述',
    image: './assert/sight.jpg',
    left: 900,
    top: 750
  },{
    id: 5,
    name: '景点e',
    desc: '景点e描述',
    image: './assert/sight.jpg',
    left: 630,
    top: 1040
  },{
    id: 6,
    name: '景点f',
    desc: '景点f描述',
    image: './assert/sight.jpg',
    left: 830,
    top: 1120
  },{
    id: 7,
    name: '景点g',
    desc: '景点g描述',
    image: './assert/sight.jpg',
    left: 900,
    top: 1400
  },{
    id: 8,
    name: '景点h',
    desc: '景点h描述',
    image: './assert/sight.jpg',
    left: 650,
    top: 1360
  },{
    id: 9,
    name: '景点i',
    desc: '景点i描述',
    image: './assert/sight.jpg',
    left: 520,
    top: 1580
  },{
    id: 10,
    name: '景点j',
    desc: '景点j描述',
    image: './assert/sight.jpg',
    left: 680,
    top: 1650
  }]

  // 步长
  const step = 10
  
  // 游人初始坐标，方便测试
  let person_left = 810
  let person_top = 1300

  let audio = null

  let sightlayer = null

  const sightDialog = ({name, desc, image, left, top}) => {
    if(sightlayer){
      sightlayer.remove()
      sightlayer = null
    }
    sightlayer = document.createElement('div')
    sightlayer.className = 'introduce_panel'
    sightlayer.style.left = left + 'px'
    sightlayer.style.top = top + 'px'
    let __html = `<div class="title">
                <h5>${name}</h5>
                <span class="close">x</span>
              </div>
              <div class="picWords">
                <div class="imgP">
                  <img src="${image}" />
                </div>
                <div class="wordsP">
                  <p>${desc}</p>
                </div>
              </div>`
    sightlayer.innerHTML = __html
    $('J_main').appendChild(sightlayer)
  }

  sightList.map(item => {
    let tempSight = document.createElement('div')
    tempSight.style.width = 100 + 'px'
    tempSight.style.height = 100 + 'px'
    // tempSight.style.background = 'rgba(0, 102, 255, 0.8)'
    tempSight.style.position = 'absolute'
    tempSight.style.left = item.left + 'px'
    tempSight.style.top = item.top + 'px'
    tempSight.setAttribute('data-id', item.id)
    $('J_main').appendChild(tempSight)
    tempSight.addEventListener('click', ev => {
      let id = ev.target.getAttribute('data-id') - 0
      let sightInfo = null
      sightList.some(item => {
        if(item.id === id) {
          sightInfo = item
          return true
        }
      })
      sightDialog(sightInfo)
    })


    let sightTitle = document.createElement('div')
    sightTitle.className = 'sightitle'
    sightTitle.style.left = item.left + 'px'
    sightTitle.style.top = item.top - 50 + 'px'
    sightTitle.innerText = item.name
    $('J_main').appendChild(sightTitle)
  })


  // 检查游人是否到达某个景点
  const checkPosition = (_left, _top) => {
    const wides = 50
    let sight = ''
    sightList.map(({left, top, name})=>{
      // 在离景点中心100像素范围内都算到达了景点
      if( (_left >= left - wides) && (_left <= left + wides) && (_top >= top - wides) && (_top <= top + wides) ){
        sight = name
        return true
      }
    })
    
    if(sight && !audio){
      // 播放声音
      audio = document.createElement('audio')
      audio.src = 'assert/bg.wav'
      audio.autoplay = 'autoplay'
      audio.id = 'J_audio'
      $('J_main').appendChild(audio)
    }

  }

  // 设置游人位置
  const setPosition = (_left, _top) => {
    let person = $('J_person')
    person.style.left = _left + 'px'
    person.style.top = _top + 'px'
    checkPosition(_left, _top)
  }

  // 设置初始位置
  setPosition(person_left,person_top)

  // 这里用方向控制模拟游人物移动
  // 向上走动
  $('J_up').addEventListener('click', ()=> {
    person_top = person_top - step
    setPosition(person_left, person_top)
  })

  // 向右走动
  $('J_right').addEventListener('click', ()=> {
    person_left = person_left + step
    setPosition(person_left, person_top)
  })

  // 向下走动
  $('J_down').addEventListener('click', ()=> {
    person_top = person_top + step
    setPosition(person_left, person_top)
  })

  // 向左走动
  $('J_left').addEventListener('click', ()=> {
    person_left = person_left - step
    setPosition(person_left, person_top)
  })

  // 关闭按钮，采用事件代理
  $('J_main').addEventListener('click', ev =>{
    if(ev.target.className === 'close'){
      let wrap = ev.target.parentNode.parentNode
      // document.body.remove(wrap)
      wrap.remove()

    }
    
  })


})()