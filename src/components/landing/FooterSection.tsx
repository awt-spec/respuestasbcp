import { useI18n } from "@/contexts/I18nContext";

const FooterSection = () => {
  const { t } = useI18n();

  return (
    <footer className="gradient-hero py-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 tracking-tight">
          SYSDE S.A. | SAF+ Credit Core System
        </h3>
        <p className="text-white/50 text-sm mb-4 italic">
          "{t("footer.slogan")}"
        </p>
        <p className="text-white/40 text-xs mb-4">
          {t("footer.contact")}: Eduardo Wheelock Bermúdez | ewheelock@sysde.com
        </p>
        <div className="flex justify-center gap-6 text-white/40 text-xs">
          <a href="https://www.sysde.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
            www.sysde.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
