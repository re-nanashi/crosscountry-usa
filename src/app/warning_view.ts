const GAME_CANVAS = <HTMLDivElement>document.getElementById("game-canvas");
/*
function displayWarningModal() {
  const warningModal: HTMLDivElement = document.createElement("div");
  warningModal.setAttribute("id", "warning-modal-container");
  warningModal.innerHTML = `
    <dialog class="nes-dialog" id="dialog-default">
      <form method="dialog">
        <span class="nes-text is-warning is-centered">Warning</span>
        <p>Please change the screen resolution to 1024 x 768 pixels or higher.</p>
        <menu class="dialog-menu">
          <button class="nes-btn">Cancel</button>
          <button class="nes-btn is-primary">Confirm</button>
        </menu>
      </form>
    </dialog>
  `;

  GAME_CANVAS.append(warningModal);

  let dialogDefault: HTMLDialogElement = <HTMLDialogElement>(
    document.getElementById("dialog-default")
  );

  dialogDefault.showModal();
}
*/

function displayWarningModal() {
  GAME_CANVAS.innerHTML = `
    <dialog class="nes-dialog is-centered" id="dialog-default">
      <form method="dialog" class="is-centered">
        <span class="nes-text is-warning is-centered">Warning</span>
        <p>Screen resolution requirements not met.</p>
        <p>Please change the screen resolution to 1024 x 768 pixels or higher.</p>
      </form>
    </dialog>
  `;

  let dialogDefault: HTMLDialogElement = <HTMLDialogElement>(
    document.getElementById("dialog-default")
  );

  dialogDefault.showModal();
}

export function renderWarningModal() {
  displayWarningModal();
}

/*
 <section>
  <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
    Open dialog
  </button>
</section>
 */
