export default {
  bind(el, binding, _) {
    let { scale, time }  = binding.value,
        zoomed           = false,
        zoomScale        = scale       || 2,
        transitionTimeMS = time        || 375,
        eventTrigger     = binding.arg || 'dblclick';

    el.style.position = 'relative';
    if (binding.modifiers.animate) el.style.transition = `transform ${transitionTimeMS}ms`;

    el.addEventListener(eventTrigger, () => {
      if (!zoomed) {
        zoomed             = true;
        el.style.zIndex    = '2';
        el.style.transform = `scale(${zoomScale})`;
        return;
      }

      zoomed              = false;
      el.style.transform  = 'scale(1)';
      if (binding.modifiers.animate) {
        setTimeout(() => {
          el.style.zIndex = '1';
        }, transitionTimeMS);
      }
      else {
        el.style.zIndex = '1';
      }
    });
  }
};
