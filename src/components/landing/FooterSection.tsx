import { useI18n } from "@/contexts/I18nContext";
import { MessageCircle, Phone, Mail } from "lucide-react";

const FooterSection = () => {
  const { t } = useI18n();

  return (
    <footer className="gradient-hero py-12">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 tracking-tight">
          SYSDE PLUS
        </h3>
        <p className="text-white/50 text-sm mb-6 italic">
          "{t("footer.slogan")}"
        </p>

        <div className="flex flex-col items-center gap-3 mb-6">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Detalles de contacto</p>
          <p className="text-white/80 text-sm font-semibold">
            Alberto Wheelock Talavera
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-white/60 text-xs">
            <a href="mailto:alwheelock@sysde.com" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              alwheelock@sysde.com
            </a>
            <a href="mailto:info@sysde.com" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" />
              info@sysde.com
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              +506 8657 0390
            </span>
          </div>
        </div>

        <a
          href="https://wa.link/u0wx1z"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold transition-colors shadow-lg shadow-emerald-500/30"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
