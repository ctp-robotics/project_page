const data=window.CTP_CONTENT;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
let taskIndex=0;
let controlIndex=0;

function media(item, label, {speed='',quiet=false}={}){
  const hasVideo=Boolean(item?.video);
  const art=hasVideo
    ? `<video autoplay muted loop playsinline preload="none" ${item.poster?`poster="${esc(item.poster)}"`:''} aria-label="${esc(label)}"><source data-src="${esc(item.video)}" type="video/mp4">Video playback is unavailable.</video><div class="clip-actions"><button class="clip-toggle" type="button" aria-label="Pause ${esc(label)}" title="Pause">Ⅱ</button><button class="clip-expand" type="button" aria-label="View ${esc(label)} fullscreen" title="Fullscreen">⛶</button></div>`
    : item?.poster
      ? `<img loading="lazy" src="${esc(item.poster)}" alt="${esc(label)} preview">`
      : `<span>${esc(label)} video</span>`;
  return `<div class="media-column"><div class="media-label"><span>${esc(label)}</span>${speed?`<span class="speed">${esc(speed)}</span>`:''}</div><div class="media-slot ${hasVideo?'':'placeholder'} ${item?.poster?'':'no-poster'}" ${quiet?'data-quiet="true"':''}>${art}</div></div>`;
}

function pair(left,right,leftLabel='Reference',rightLabel='CTP execution'){
  return `<div class="pair">${media(left,leftLabel)}${media(right,rightLabel)}</div>`;
}

const videoObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    const video=entry.target;
    if(entry.intersectionRatio>=0.25){
      const source=video.querySelector('source');
      if(!source.src){source.src=source.dataset.src;video.load();}
      if(video.dataset.userPaused!=='true')video.play().catch(()=>{});
    }else{
      video.pause();
    }
  });
},{threshold:0.25});

function refreshVideoObserver(){
  videoObserver.disconnect();
  document.querySelectorAll('video[autoplay]').forEach(video=>{
    if(!video.dataset.controlsBound){
      video.dataset.controlsBound='true';
      const slot=video.closest('.media-slot');
      const toggle=slot.querySelector('.clip-toggle');
      const expand=slot.querySelector('.clip-expand');
      const sync=()=>{
        toggle.textContent=video.paused?'▶':'Ⅱ';
        toggle.title=video.paused?'Play':'Pause';
        toggle.setAttribute('aria-label',`${video.paused?'Play':'Pause'} ${video.getAttribute('aria-label')}`);
        slot.classList.toggle('is-paused',video.paused);
      };
      video.addEventListener('play',sync);
      video.addEventListener('pause',sync);
      toggle.addEventListener('click',()=>{
        if(video.paused){video.dataset.userPaused='false';video.play().catch(()=>{});}
        else{video.dataset.userPaused='true';video.pause();}
      });
      expand.addEventListener('click',()=>{
        video.controls=true;
        const restore=()=>{
          if(document.fullscreenElement===video)return;
          video.controls=false;
          document.removeEventListener('fullscreenchange',restore);
        };
        document.addEventListener('fullscreenchange',restore);
        if(video.requestFullscreen)video.requestFullscreen().catch(restore);
        else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();
        else restore();
      });
      sync();
    }
    videoObserver.observe(video);
  });
}

function renderLinks(){
  const items=[['Paper',data.links.paper],['Code',data.links.code],['Dataset',data.links.dataset]];
  $('resources').hidden=false;
  $('citation-nav').hidden=!data.bibtex;
  $('citation-block').hidden=!data.bibtex;
  for(const id of ['hero-links','footer-links'])$(id).innerHTML=items.filter(([label,url])=>label!=='Dataset'||url).map(([label,url])=>url
    ? `<a class="resource-button" href="${esc(url)}" ${url.startsWith('#')?'':'target="_blank" rel="noopener"'}>${label}<span aria-hidden="true">↗</span></a>`
    : `<span class="resource-button disabled" aria-label="${label} link coming soon">${label}<small>Coming soon</small></span>`).join('');
  $('authors').classList.toggle('empty',!data.authors.length);
  $('authors').innerHTML=data.authors.length
    ? `<div class="author-list">${[data.authors.slice(0,6),data.authors.slice(6)].map(row=>`<div class="author-row">${row.map(author=>`<span class="author">${esc(author.name)}<sup>${author.symbol?`${esc(author.symbol)},`:''}${esc(author.affiliations)}</sup></span>`).join('')}</div>`).join('')}</div><div class="affiliation-list">${data.affiliations.map((affiliation,i)=>`<span><sup>${i+1}</sup> ${esc(affiliation)}</span>`).join('')}</div>${data.authorNote?`<div class="author-note">${esc(data.authorNote)}</div>`:''}`
    : '';
  if(data.bibtex){$('bibtex').textContent=data.bibtex;$('copy-bibtex').hidden=false;$('copy-bibtex').addEventListener('click',async()=>{await navigator.clipboard.writeText(data.bibtex);$('copy-bibtex').textContent='Copied';setTimeout(()=>$('copy-bibtex').textContent='Copy BibTeX',1600)});}
}

function renderTransfer(){
  $('transfer-stage').querySelectorAll('video').forEach(video=>video.pause());
  $('task-tabs').innerHTML=data.tasks.map((task,i)=>`<button type="button" role="tab" aria-selected="${i===taskIndex}" aria-controls="transfer-stage" data-index="${i}">${esc(task.label)}</button>`).join('');
  const task=data.tasks[taskIndex];
  $('transfer-stage').innerHTML=`<div class="transfer-list"><div class="transfer-header" aria-hidden="true"><span></span><span>Guided reference</span><span>Autonomous CTP execution</span></div>${task.cases.map(sample=>`<article class="transfer-card"><h3>${esc(sample.label)}</h3>${pair(sample.reference,sample.execution,'Guided reference','Autonomous CTP execution')}</article>`).join('')}</div>`;
  refreshVideoObserver();
  $('task-tabs').querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{taskIndex=+button.dataset.index;renderTransfer()}));
}

function renderControl(){
  $('control-stage').querySelectorAll('video').forEach(video=>video.pause());
  $('control-tabs').innerHTML=data.control.map((group,i)=>`<button id="control-tab-${esc(group.id)}" type="button" role="tab" aria-selected="${i===controlIndex}" aria-controls="control-stage" tabindex="${i===controlIndex?0:-1}" data-index="${i}">${esc(group.title)}</button>`).join('');
  const group=data.control[controlIndex];
  $('control-stage').setAttribute('aria-labelledby',`control-tab-${group.id}`);
  $('control-stage').innerHTML=`<div class="control-panel"><div class="control-columns" aria-hidden="true"><span></span><span>Reference</span><span>CTP execution</span></div>${group.rows.map((row,i)=>`<div class="control-row"><div class="row-label ${group.id==='force'?i?'force-heavy':'force-light':'direction'}">${esc(row.label)}</div>${pair(row.reference,row.execution)}</div>`).join('')}</div>`;
  $('control-tabs').querySelectorAll('button').forEach(button=>{
    button.addEventListener('click',()=>{controlIndex=+button.dataset.index;renderControl()});
    button.addEventListener('keydown',event=>{
      const next=event.key==='ArrowRight'?(controlIndex+1)%data.control.length:event.key==='ArrowLeft'?(controlIndex-1+data.control.length)%data.control.length:event.key==='Home'?0:event.key==='End'?data.control.length-1:null;
      if(next===null)return;
      event.preventDefault();
      controlIndex=next;
      renderControl();
      $('control-tabs').querySelectorAll('button')[controlIndex].focus();
    });
  });
  refreshVideoObserver();
}

function renderExtras(){
  $('baseline-stage').innerHTML=`<article class="stage-card">${pair(data.baseline.left,data.baseline.right,'BPP*','CTP')}<div class="stage-actions"><p>BPP* (Behavior Prompting Policy with tactile inputs) misses the surface; CTP completes the wipe.</p></div></article>`;
  $('tool-stage').innerHTML=`<div class="tool-showcase"><article class="tool-card">${media(data.toolExample,'Eraser example')}<h3>Eraser</h3><p>Training tool</p></article>${data.tools.map(tool=>`<article class="tool-card">${media(tool.execution,`CTP with ${tool.label.toLowerCase()}`)}<h3>${esc(tool.label)}</h3><p>CTP execution</p></article>`).join('')}</div>`;
  $('flow-media').innerHTML=media(data.fullProcess,'Full process').replace('<div class="media-label"><span>Full process</span></div>','');
  refreshVideoObserver();
}

renderLinks();renderTransfer();renderControl();renderExtras();
