 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..769e542cca397c4a93ca02b2e79a476f7a504c82
--- /dev/null
+++ b/script.js
@@ -0,0 +1,117 @@
+const produtos = [
+  {
+    id: 'geladeira',
+    nome: 'Geladeira Consul Frost Free Duplex CRM40MK',
+    imagem: 'https://http2.mlstatic.com/D_NQ_NP_2X_968276-MLA82488640803_022025-F.webp',
+    link: 'https://www.mercadolivre.com.br/geladeira-consul-frost-free-duplex-crm40mk/p/MLB59801103#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=58&type=product&tracking_id=7fab754b-752b-47ff-9491-2e956a0cc5de&wid=MLB6020267016&sid=search'
+  },
+  {
+    id: 'panelas',
+    nome: 'Jogo de Panelas Rochedo 5 peças',
+    imagem: 'https://a-static.mlcdn.com.br/800x560/jogo-de-panelas-rochedo-antiaderente-de-aluminio-chocolate-5-pecas-expert/mercadolivre/238655200/e0ec85f2f4f1f35f7ce9e5f2b85d6e95.jpg',
+    link: 'https://www.magazineluiza.com.br/jogo-de-panelas-rochedo-antiaderente-de-aluminio-chocolate-5-pecas-expert/p/238655200/ud/cjpn/?seller_id=magazineluiza'
+  },
+  {
+    id: 'talheres',
+    nome: 'Faqueiro / Talheres 24 peças',
+    imagem: 'https://m.media-amazon.com/images/I/61LhW1MvkfL._AC_SX679_.jpg',
+    link: 'https://www.amazon.com.br/Talheres-Pe%C3%A7as-Faqueiro-Conjunto-Talher/dp/B0GCYWK54J/ref=asc_df_B0GCYWK54J?tag=brbngshpdsk-20&linkCode=df0&hvadid=77240908718513&hvnetw=o&hvqmt=e&hvbmt=be&hvdev=c&hvlocint=&hvlocphy=688&hvtargid=pla-4580840338903187&psc=1&msclkid=418d3d97e03d19a7f9275469a3856467'
+  },
+  {
+    id: 'airfryer',
+    nome: 'Fritadeira Air Fryer 5,5L Widemax Midea',
+    imagem: 'https://http2.mlstatic.com/D_NQ_NP_2X_849980-MLA80659752689_112024-F.webp',
+    link: 'https://www.mercadolivre.com.br/fritadeira-air-fryer-55l-widemax-com-interior-de-aluminio-1900w-midea/p/MLB50256671#polycard_client=search-desktop&be_origin=backend&search_layout=grid&position=12&type=product&tracking_id=cffbbf6d-4cf2-4301-a471-f7fe5be2f2c6&wid=MLB5742654474&sid=search'
+  }
+];
+
+const lista = document.getElementById('listaProdutos');
+const template = document.getElementById('produtoTemplate');
+
+function getEstado(id) {
+  return localStorage.getItem(`produto:${id}`) || 'livre';
+}
+
+function setEstado(id, estado) {
+  localStorage.setItem(`produto:${id}`, estado);
+}
+
+function textoEstado(estado) {
+  if (estado === 'reservado') return 'Reservado';
+  if (estado === 'comprado') return 'Comprado';
+  return 'Livre';
+}
+
+function render() {
+  lista.innerHTML = '';
+  produtos.forEach((produto) => {
+    const node = template.content.cloneNode(true);
+    const card = node.querySelector('.card');
+    const img = node.querySelector('.foto');
+    const nome = node.querySelector('.nome');
+    const status = node.querySelector('.status span');
+    const link = node.querySelector('a.btn');
+    const reservar = node.querySelector('.reservar');
+    const desreservar = node.querySelector('.desreservar');
+    const confirmar = node.querySelector('.confirmar');
+    const msg = node.querySelector('.mensagem');
+
+    img.src = produto.imagem;
+    img.alt = produto.nome;
+    nome.textContent = produto.nome;
+    link.href = produto.link;
+
+    const estado = getEstado(produto.id);
+    status.textContent = textoEstado(estado);
+
+    reservar.onclick = () => {
+      setEstado(produto.id, 'reservado');
+      msg.textContent = 'Produto reservado com sucesso!';
+      render();
+    };
+
+    desreservar.onclick = () => {
+      setEstado(produto.id, 'livre');
+      msg.textContent = 'Reserva desfeita. Produto novamente disponível.';
+      render();
+    };
+
+    confirmar.onclick = () => {
+      setEstado(produto.id, 'comprado');
+      msg.textContent = 'Obrigado! Recebemos sua confirmação de compra/PIX.';
+      render();
+    };
+
+    if (estado === 'comprado') card.style.border = '2px solid #198754';
+    if (estado === 'reservado') card.style.border = '2px solid #d59d00';
+
+    lista.appendChild(node);
+  });
+}
+
+const bgColor = document.getElementById('bgColor');
+const cardColor = document.getElementById('cardColor');
+document.getElementById('salvarCores').onclick = () => {
+  localStorage.setItem('tema:bg', bgColor.value);
+  localStorage.setItem('tema:card', cardColor.value);
+  aplicarTema();
+};
+document.getElementById('resetarCores').onclick = () => {
+  localStorage.removeItem('tema:bg');
+  localStorage.removeItem('tema:card');
+  bgColor.value = '#f7f3ef';
+  cardColor.value = '#ffffff';
+  aplicarTema();
+};
+
+function aplicarTema() {
+  const bg = localStorage.getItem('tema:bg') || '#f7f3ef';
+  const card = localStorage.getItem('tema:card') || '#ffffff';
+  document.documentElement.style.setProperty('--bg', bg);
+  document.documentElement.style.setProperty('--card', card);
+  bgColor.value = bg;
+  cardColor.value = card;
+}
+
+aplicarTema();
+render();
 
EOF
)
