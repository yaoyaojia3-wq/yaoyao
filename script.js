const skills={
  hil:{index:'01',kicker:'HIL SIMULATION',title:'BMS 闭环仿真与故障注入',description:'围绕休眠唤醒、状态机、上下高压、热管理及充电场景搭建与执行HIL测试；模拟温度、电压、电流、继电器反馈与充电连接状态，验证控制策略和故障响应。',tags:['休眠唤醒','上下高压','热管理','故障注入','闭环仿真']},
  automation:{index:'02',kicker:'AUTOMATION TOOLCHAIN',title:'自动化回归与模型联调',description:'使用ECU-TEST完成前置条件配置、测试步骤编排、信号赋值、结果判定与报告生成；基于MATLAB/Simulink进行模型参数配置、信号映射和输入输出检查。',tags:['ECU-TEST','MATLAB','Simulink','自动化回归','模型联调']},
  protocol:{index:'03',kicker:'BUS & PROTOCOL',title:'车载通信与充电协议验证',description:'使用CANoe及周立功工具采集CAN/CANFD报文，结合DBC与CAN Trace分析BMS状态；参与GB/T 27930充电机握手、参数配置、充电过程及终止阶段报文验证。',tags:['CANoe','CAN FD','DBC','CAN Trace','GB/T 27930','CC / CP']},
  quality:{index:'04',kicker:'QUALITY DELIVERY',title:'测试设计、缺陷闭环与交付',description:'根据功能需求拆解功能、边界与异常测试点，完成用例设计、执行、报告输出及缺陷回归；通过日志和测试记录复现问题，协同开发推动缺陷高效闭环。',tags:['需求分析','用例设计','缺陷管理','日志分析','SOP交付']}
};
const $=(selector,scope=document)=>scope.querySelector(selector);const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});$$('.reveal').forEach(el=>revealObserver.observe(el));

let counted=false;const metricsObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!counted){counted=true;$$('.metric-number').forEach(el=>{const target=Number(el.dataset.count);const start=performance.now();const duration=1200;const tick=now=>{const progress=Math.min((now-start)/duration,1);el.textContent=Math.floor(target*(1-Math.pow(1-progress,3)));if(progress<1)requestAnimationFrame(tick)};requestAnimationFrame(tick)})}},{threshold:.4});metricsObserver.observe($('.metrics'));

$$('.skill-tab').forEach(tab=>tab.addEventListener('click',()=>{const data=skills[tab.dataset.skill];$$('.skill-tab').forEach(item=>{item.classList.toggle('active',item===tab);item.setAttribute('aria-selected',item===tab)});const panel=$('#skillPanel');panel.animate([{opacity:.25,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:300});$('#skillIndex').textContent=data.index;$('#skillKicker').textContent=data.kicker;$('#skillTitle').textContent=data.title;$('#skillDescription').textContent=data.description;$('#skillTags').innerHTML=data.tags.map(tag=>`<span>${tag}</span>`).join('')}));

$$('.expand').forEach(button=>button.addEventListener('click',()=>{const body=button.closest('.project-main').querySelector('.project-body');const open=body.classList.toggle('open');button.setAttribute('aria-expanded',open);button.textContent=open?'−':'＋'}));
$$('.filter').forEach(button=>button.addEventListener('click',()=>{$$('.filter').forEach(item=>item.classList.toggle('active',item===button));$$('.project-card').forEach(card=>card.classList.toggle('hidden',button.dataset.filter!=='all'&&card.dataset.type!==button.dataset.filter))}));

const themeToggle=$('#themeToggle');themeToggle.addEventListener('click',()=>{const root=document.documentElement;const isLight=root.dataset.theme!=='light';root.dataset.theme=isLight?'light':'dark';themeToggle.setAttribute('aria-pressed',isLight);localStorage.setItem('resume-theme',root.dataset.theme)});const savedTheme=localStorage.getItem('resume-theme');if(savedTheme){document.documentElement.dataset.theme=savedTheme;themeToggle.setAttribute('aria-pressed',savedTheme==='light')}

$('#copyPhone').addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('#copyPhone').dataset.phone)}catch{const area=document.createElement('textarea');area.value=$('#copyPhone').dataset.phone;document.body.appendChild(area);area.select();document.execCommand('copy');area.remove()}const toast=$('#toast');toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1800)});

const sections=$$('main section[id]');const navLinks=$$('.site-header nav a');const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}),{rootMargin:'-35% 0px -55%'});sections.forEach(section=>navObserver.observe(section));
$('#year').textContent=new Date().getFullYear();
