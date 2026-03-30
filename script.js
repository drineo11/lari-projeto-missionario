const pixKey = "lariefut@gmail.com";
const copyButton = document.getElementById("copy-pix");
const feedback = document.getElementById("copy-feedback");
const shareButtons = document.querySelectorAll(".share-trigger");
const siteHeader = document.querySelector(".site-header");

async function copyPixKey() {
  try {
    await navigator.clipboard.writeText(pixKey);
    feedback.textContent = "Chave PIX copiada com sucesso.";
    copyButton.textContent = "PIX copiado";
  } catch (error) {
    feedback.textContent =
      "Não foi possível copiar automaticamente. Use a chave: lariefut@gmail.com";
  }

  window.setTimeout(() => {
    feedback.textContent = "";
    copyButton.textContent = "Copiar chave PIX";
  }, 2600);
}

async function shareProject() {
  const shareData = {
    title: "Tour Chicago Eagles | Futebol e Missões",
    text:
      "Apoie a participação missionária e esportiva de Lariesca Aquino na Tour Chicago Eagles. Contribua e compartilhe essa missão.",
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") {
        return;
      }
    }
  }

  try {
    await navigator.clipboard.writeText(
      `${shareData.text}\n${shareData.url}`
    );
    window.alert("Link do projeto copiado para compartilhamento.");
  } catch (error) {
    window.prompt("Copie este link para compartilhar a missão:", shareData.url);
  }
}

if (copyButton) {
  copyButton.addEventListener("click", copyPixKey);
}

shareButtons.forEach((button) => {
  button.addEventListener("click", shareProject);
});

function updateMobileHeaderState() {
  if (!siteHeader) {
    return;
  }

  const isMobile = window.innerWidth <= 759;
  const shouldCompact = isMobile && window.scrollY > 48;

  siteHeader.classList.toggle("is-compact", shouldCompact);
}

window.addEventListener("scroll", updateMobileHeaderState, { passive: true });
window.addEventListener("resize", updateMobileHeaderState);

updateMobileHeaderState();
