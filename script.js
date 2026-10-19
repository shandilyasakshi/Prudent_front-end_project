(function(){
  const body=document.body;
  const toast=document.getElementById('toast');
  function showToast(message){
    if(!toast) return;
    toast.textContent=message; toast.classList.add('show');
    clearTimeout(window.__toastTimer); window.__toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
  }
  document.querySelectorAll('[data-toast]').forEach(el=>el.addEventListener('click',()=>showToast(el.dataset.toast)));

  const savedTheme=localStorage.getItem('prudent-theme');
  if(savedTheme==='dark') body.classList.add('dark');
  document.querySelectorAll('[data-theme-toggle]').forEach(btn=>btn.addEventListener('click',()=>{
    body.classList.toggle('dark');
    localStorage.setItem('prudent-theme',body.classList.contains('dark')?'dark':'light');
    showToast(body.classList.contains('dark')?'Dark mode enabled':'Light mode enabled');
  }));

  const sidebar=document.getElementById('sidebar');
  document.querySelectorAll('[data-menu]').forEach(btn=>btn.addEventListener('click',()=>sidebar&&sidebar.classList.toggle('open')));
  document.addEventListener('click',e=>{
    if(sidebar && sidebar.classList.contains('open') && !sidebar.contains(e.target) && !e.target.closest('[data-menu]')) sidebar.classList.remove('open');
  });

  document.querySelectorAll('[data-modal-open]').forEach(btn=>btn.addEventListener('click',()=>{
    const m=document.getElementById(btn.dataset.modalOpen); if(m) m.classList.add('open');
  }));
  document.querySelectorAll('[data-modal-close]').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.modal-backdrop')?.classList.remove('open')));
  document.querySelectorAll('.modal-backdrop').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open')}));

  document.querySelectorAll('.tabs .tab').forEach(tab=>tab.addEventListener('click',()=>{
    const tabs=tab.parentElement; tabs.querySelectorAll('.tab').forEach(t=>t.classList.remove('active')); tab.classList.add('active');
    const mode=tab.textContent.trim().toLowerCase();
    const login=document.getElementById('loginState'), signup=document.getElementById('signupState');
    if(login&&signup){login.classList.toggle('active',mode==='login');signup.classList.toggle('active',mode!=='login');}
  }));

  document.querySelectorAll('form').forEach(form=>form.addEventListener('submit',e=>{
    e.preventDefault();
    const modal=form.closest('.modal-backdrop');
    if(modal) modal.classList.remove('open');
    showToast(form.id==='addTransactionForm'?'Transaction added successfully':'Saved successfully');
    form.reset();
  }));

  document.querySelectorAll('[data-demo-action]').forEach(el=>el.addEventListener('click',()=>showToast(el.dataset.demoAction)));

  // Give filter buttons a clear selected state without requiring a framework.
  document.querySelectorAll('.toolbar .filter').forEach(filter=>filter.addEventListener('click',()=>{
    if(filter.tagName==='BUTTON'){
      filter.parentElement.querySelectorAll('.filter').forEach(x=>x.classList.remove('selected'));
      filter.classList.add('selected');
      showToast((filter.textContent||'Filter')+' selected');
    }
  }));
})();