// Candle Calculator: math + i18n + page wiring. No framework, no build step.
const LANGS = ['en', 'de', 'fr', 'ja'];
const G_PER_OZ = 28.349523125;
const ML_PER_FLOZ = 29.5735295625;
// ponytail: one density for every wax (the figure suppliers publish); add a per-wax table if users ask for it
const WAX_G_PER_ML = 0.86;
// grams of candle (wax + oil) per unit of fill
const GRAMS_PER_UNIT = { g: 1, oz: G_PER_OZ, ml: WAX_G_PER_ML, floz: ML_PER_FLOZ * WAX_G_PER_ML };

function calc({ count, fill, unit, load, method }) {
    const total = fill * GRAMS_PER_UNIT[unit];
    const r = load / 100;
    // 'wax': oil = wax × r (supplier convention). 'total': oil = total × r.
    const wax = method === 'total' ? total * (1 - r) : total / (1 + r);
    const fo = total - wax;
    return { wax: wax * count, fo: fo * count, total: total * count, each: { wax, fo, total } };
}

const T = {
    en: {
        siteName: 'Candle Calculator',
        title: 'Candle Wax & Fragrance Oil Calculator | Free, no sign-up',
        metaDesc: 'Work out how much wax and fragrance oil to weigh for any number of candles. Enter your jar size and fragrance load, get grams and ounces.',
        privacyTitle: 'Privacy policy | Candle Calculator',
        termsTitle: 'Terms of use | Candle Calculator',
        langLabel: 'Language',
        h1: 'Wax and fragrance oil calculator',
        lede: "Enter your jar size and fragrance load. You'll get the grams and ounces to put on the scale.",
        labelCount: 'Number of candles',
        labelFill: 'Fill per candle',
        unitFloz: 'fl oz (jar volume)',
        unitMl: 'ml (jar volume)',
        unitOz: 'oz (weight)',
        unitG: 'g (weight)',
        hintFill: "Measure up to where you'll pour, not to the brim. Volume converts at 0.86 g of wax per ml.",
        labelLoad: 'Fragrance load',
        hintLoad: "Most waxes hold 6–10%. Check your wax's maximum before going higher.",
        legendMethod: 'Fragrance load is a percentage of',
        methodWax: 'wax weight (most suppliers)',
        methodTotal: 'total weight',
        resultsTitle: 'What to weigh',
        resWax: 'Wax',
        resFo: 'Fragrance oil',
        perCandle: 'Per candle: {wax} wax and {fo} fragrance oil, {total} in total.',
        invalid: 'Enter at least 1 candle, a fill above 0 and a fragrance load from 0 to 15%.',
        copyLink: 'Copy link',
        copied: 'Link copied',
        print: 'Print',
        howTitle: "How it's calculated",
        how1: 'Volume is turned into wax weight at 0.86 g per ml, the figure most suppliers use for soy and paraffin.',
        how2: 'With load as a % of wax weight: wax = fill ÷ (1 + load), fragrance oil = wax × load.',
        how3: 'With load as a % of total weight: fragrance oil = fill × load, wax = fill − fragrance oil.',
        how4: "Weigh fragrance oil on a scale. Oils vary in density, so a measuring cup won't give you the right amount.",
        faqTitle: 'Questions',
        q1: 'How much fragrance oil goes in an 8 oz candle?',
        a1: "An 8 fl oz jar holds about 203 g of wax. At an 8% load measured against wax weight, that's about 15 g (0.53 oz) of fragrance oil and 188 g (6.65 oz) of wax.",
        q2: 'What fragrance load should I use?',
        a2: "Start at 6–8% for most soy and paraffin blends. Many waxes accept up to 10 or 12%, but past your wax's limit the oil seeps out onto the surface, which makers call sweating. Your supplier lists the maximum on the product page.",
        q3: 'Is the load a percentage of the wax or of the whole candle?',
        a3: 'Most suppliers mean the wax weight: an 8% load is 8 g of oil per 100 g of wax. Some makers calculate against the total weight instead, which gives slightly more oil. Pick the convention your recipe or supplier uses.',
        q4: 'Why does my jar hold less wax than its fl oz size?',
        a4: "Fl oz measures volume, and wax is lighter than water. One fluid ounce of melted wax weighs about 0.9 oz, so an 8 fl oz jar takes roughly 7.2 oz of wax. Jars are also sold by brim capacity, and you'll pour below the rim.",
        footerHome: 'Calculator',
        footerPrivacy: 'Privacy',
        footerTerms: 'Terms',
        footerNote: "Results are estimates. Follow your wax and fragrance supplier's safety guidance."
    },
    de: {
        siteName: 'Kerzenrechner',
        title: 'Kerzenrechner für Wachs und Duftöl | Kostenlos, ohne Anmeldung',
        metaDesc: 'Berechne, wie viel Wachs und Duftöl du für deine Kerzen abwiegen musst. Gefäßgröße und Duftanteil eingeben, Gramm und Unzen erhalten.',
        privacyTitle: 'Datenschutzerklärung | Kerzenrechner',
        termsTitle: 'Nutzungsbedingungen | Kerzenrechner',
        langLabel: 'Sprache',
        h1: 'Wachs- und Duftölrechner',
        lede: 'Gib Gefäßgröße und Duftanteil ein. Du bekommst die Gramm und Unzen, die auf die Waage müssen.',
        labelCount: 'Anzahl Kerzen',
        labelFill: 'Füllmenge pro Kerze',
        unitFloz: 'fl oz (Gefäßvolumen)',
        unitMl: 'ml (Gefäßvolumen)',
        unitOz: 'oz (Gewicht)',
        unitG: 'g (Gewicht)',
        hintFill: 'Miss bis zur Füllhöhe, nicht bis zum Rand. Volumen wird mit 0,86 g Wachs pro ml umgerechnet.',
        labelLoad: 'Duftanteil',
        hintLoad: 'Die meisten Wachse vertragen 6–10 %. Prüfe vor höheren Werten das Maximum deines Wachses.',
        legendMethod: 'Der Duftanteil bezieht sich auf',
        methodWax: 'das Wachsgewicht (bei den meisten Händlern)',
        methodTotal: 'das Gesamtgewicht',
        resultsTitle: 'Das kommt auf die Waage',
        resWax: 'Wachs',
        resFo: 'Duftöl',
        perCandle: 'Pro Kerze: {wax} Wachs und {fo} Duftöl, insgesamt {total}.',
        invalid: 'Gib mindestens 1 Kerze, eine Füllmenge über 0 und einen Duftanteil von 0 bis 15 % ein.',
        copyLink: 'Link kopieren',
        copied: 'Link kopiert',
        print: 'Drucken',
        howTitle: 'So wird gerechnet',
        how1: 'Volumen wird mit 0,86 g pro ml in Wachsgewicht umgerechnet. Mit diesem Wert rechnen die meisten Händler für Soja- und Paraffinwachs.',
        how2: 'Duftanteil bezogen auf das Wachsgewicht: Wachs = Füllmenge ÷ (1 + Duftanteil), Duftöl = Wachs × Duftanteil.',
        how3: 'Duftanteil bezogen auf das Gesamtgewicht: Duftöl = Füllmenge × Duftanteil, Wachs = Füllmenge − Duftöl.',
        how4: 'Wiege Duftöl immer ab. Öle haben unterschiedliche Dichten, ein Messbecher trifft die Menge daher nicht genau.',
        faqTitle: 'Häufige Fragen',
        q1: 'Wie viel Duftöl kommt in eine Kerze mit 200 ml?',
        a1: 'Ein Glas mit 200 ml Füllmenge fasst etwa 172 g Wachs. Bei 8 % Duftanteil bezogen auf das Wachs sind das rund 13 g Duftöl und 159 g Wachs.',
        q2: 'Welchen Duftanteil sollte ich nehmen?',
        a2: 'Starte bei 6–8 % für die meisten Soja- und Paraffinmischungen. Viele Wachse vertragen bis 10 oder 12 %. Über dem Limit deines Wachses tritt Öl an der Oberfläche aus. Das Maximum steht beim Händler auf der Produktseite.',
        q3: 'Bezieht sich der Duftanteil auf das Wachs oder auf die ganze Kerze?',
        a3: 'Die meisten Händler meinen das Wachsgewicht: 8 % sind 8 g Öl pro 100 g Wachs. Manche rechnen mit dem Gesamtgewicht, das ergibt etwas mehr Öl. Wähle die Methode, die dein Rezept oder Händler verwendet.',
        q4: 'Warum passt weniger Wachs in Gramm ins Glas, als die ml-Angabe vermuten lässt?',
        a4: 'ml misst das Volumen, und Wachs ist leichter als Wasser. Ein Milliliter geschmolzenes Wachs wiegt etwa 0,86 g, ein 200-ml-Glas nimmt also rund 172 g Wachs auf. Gläser werden außerdem mit Randvolumen verkauft, gegossen wird darunter.',
        footerHome: 'Rechner',
        footerPrivacy: 'Datenschutz',
        footerTerms: 'Nutzungsbedingungen',
        footerNote: 'Alle Werte sind Richtwerte. Beachte die Sicherheitshinweise deiner Wachs- und Duftöllieferanten.'
    },
    fr: {
        siteName: 'Calculateur de bougies',
        title: "Calculateur de cire et d'huile parfumée pour bougies | Gratuit, sans inscription",
        metaDesc: 'Calculez la quantité de cire et de parfum à peser pour vos bougies. Indiquez le contenant et le taux de parfum, obtenez les grammes et les onces.',
        privacyTitle: 'Politique de confidentialité | Calculateur de bougies',
        termsTitle: "Conditions d'utilisation | Calculateur de bougies",
        langLabel: 'Langue',
        h1: 'Calculateur de cire et de parfum',
        lede: 'Indiquez la taille du contenant et le taux de parfum. Vous obtenez les grammes et les onces à peser.',
        labelCount: 'Nombre de bougies',
        labelFill: 'Remplissage par bougie',
        unitFloz: 'fl oz (volume du contenant)',
        unitMl: 'ml (volume du contenant)',
        unitOz: 'oz (poids)',
        unitG: 'g (poids)',
        hintFill: "Mesurez jusqu'au niveau de coulage, pas jusqu'au bord. Le volume est converti à 0,86 g de cire par ml.",
        labelLoad: 'Taux de parfum',
        hintLoad: "La plupart des cires acceptent 6 à 10 %. Vérifiez le maximum de votre cire avant d'aller au-delà.",
        legendMethod: 'Le taux de parfum est calculé sur',
        methodWax: 'le poids de cire (la plupart des fournisseurs)',
        methodTotal: 'le poids total',
        resultsTitle: 'À peser',
        resWax: 'Cire',
        resFo: 'Parfum',
        perCandle: 'Par bougie : {wax} de cire et {fo} de parfum, {total} au total.',
        invalid: 'Indiquez au moins 1 bougie, un remplissage supérieur à 0 et un taux de parfum de 0 à 15 %.',
        copyLink: 'Copier le lien',
        copied: 'Lien copié',
        print: 'Imprimer',
        howTitle: 'Méthode de calcul',
        how1: 'Le volume est converti en poids de cire à 0,86 g par ml, la valeur utilisée par la plupart des fournisseurs pour la cire de soja et la paraffine.',
        how2: 'Taux sur le poids de cire : cire = remplissage ÷ (1 + taux), parfum = cire × taux.',
        how3: 'Taux sur le poids total : parfum = remplissage × taux, cire = remplissage − parfum.',
        how4: "Pesez toujours le parfum. Les huiles n'ont pas toutes la même densité, un verre doseur ne donne donc pas la bonne quantité.",
        faqTitle: 'Questions fréquentes',
        q1: 'Combien de parfum pour une bougie de 200 ml ?',
        a1: 'Un contenant rempli à 200 ml accueille environ 172 g de cire. Avec un taux de 8 % calculé sur la cire, il faut environ 13 g de parfum et 159 g de cire.',
        q2: 'Quel taux de parfum choisir ?',
        a2: "Commencez à 6–8 % pour la plupart des cires de soja et de paraffine. Beaucoup de cires acceptent jusqu'à 10 ou 12 %. Au-delà de la limite de votre cire, l'huile remonte en surface et la bougie « transpire ». Le fournisseur indique le maximum sur la fiche produit.",
        q3: 'Le taux se calcule-t-il sur la cire ou sur la bougie entière ?',
        a3: "La plupart des fournisseurs parlent du poids de cire : 8 % correspond à 8 g d'huile pour 100 g de cire. Certains calculent sur le poids total, ce qui donne un peu plus d'huile. Choisissez la méthode de votre recette ou de votre fournisseur.",
        q4: 'Pourquoi mon contenant prend-il moins de grammes de cire que de ml ?',
        a4: "Les ml mesurent un volume, et la cire est plus légère que l'eau. Un millilitre de cire fondue pèse environ 0,86 g, un contenant de 200 ml prend donc environ 172 g de cire. Les contenants sont aussi vendus avec leur volume à ras bord, et l'on coule en dessous.",
        footerHome: 'Calculateur',
        footerPrivacy: 'Confidentialité',
        footerTerms: "Conditions d'utilisation",
        footerNote: 'Les résultats sont indicatifs. Suivez les consignes de sécurité de vos fournisseurs de cire et de parfum.'
    },
    ja: {
        siteName: 'キャンドル計算機',
        title: 'キャンドルのワックス・香料計算機｜無料・登録不要',
        metaDesc: '作るキャンドルの数に必要なワックスとフレグランスオイルの量を計算します。容器のサイズと香料の割合を入れるだけで、グラムとオンスで表示します。',
        privacyTitle: 'プライバシーポリシー｜キャンドル計算機',
        termsTitle: '利用規約｜キャンドル計算機',
        langLabel: '言語',
        h1: 'ワックスと香料の計算機',
        lede: '容器のサイズと香料の割合を入力すると、はかりで量るグラム数とオンス数がわかります。',
        labelCount: 'キャンドルの数',
        labelFill: '1個あたりの充填量',
        unitFloz: 'fl oz（容器の容量）',
        unitMl: 'ml（容器の容量）',
        unitOz: 'oz（重さ）',
        unitG: 'g（重さ）',
        hintFill: '縁までではなく、実際に注ぐ高さまでの容量を入れてください。容量はワックス1 mlあたり0.86 gで換算します。',
        labelLoad: '香料の割合',
        hintLoad: '多くのワックスは6〜10%まで入ります。それ以上にする前に、ワックスの上限を確認してください。',
        legendMethod: '香料の割合の基準',
        methodWax: 'ワックスの重さ（多くの販売店の方式）',
        methodTotal: '全体の重さ',
        resultsTitle: '量る分量',
        resWax: 'ワックス',
        resFo: 'フレグランスオイル',
        perCandle: '1個あたり：ワックス{wax}、フレグランスオイル{fo}、合計{total}。',
        invalid: 'キャンドルの数は1以上、充填量は0より大きい値、香料の割合は0〜15%で入力してください。',
        copyLink: 'リンクをコピー',
        copied: 'コピーしました',
        print: '印刷',
        howTitle: '計算方法',
        how1: '容量は1 mlあたり0.86 gでワックスの重さに換算します。ソイワックスやパラフィンで多くの販売店が使う値です。',
        how2: 'ワックスの重さ基準：ワックス＝充填量÷(1＋割合)、フレグランスオイル＝ワックス×割合。',
        how3: '全体の重さ基準：フレグランスオイル＝充填量×割合、ワックス＝充填量−フレグランスオイル。',
        how4: 'フレグランスオイルは必ずはかりで量ってください。オイルによって密度が違うため、計量カップでは正確に量れません。',
        faqTitle: 'よくある質問',
        q1: '200 mlのキャンドルにはフレグランスオイルがどれくらい必要？',
        a1: '200 ml分を注ぐ容器には、ワックスが約172 g入ります。ワックス基準で8%なら、フレグランスオイル約13 gとワックス約159 gです。',
        q2: '香料の割合は何%がいい？',
        a2: '多くのソイ・パラフィン系ワックスは6〜8%から始めるのがおすすめです。10〜12%まで入るワックスも多いですが、上限を超えると表面にオイルがにじみ出ます。上限は販売店の商品ページに記載されています。',
        q3: '割合はワックスに対して？キャンドル全体に対して？',
        a3: '多くの販売店はワックスの重さを基準にしています。8%なら、ワックス100 gに対してオイル8 gです。全体の重さを基準にする作り手もいて、その場合はオイルが少し多くなります。レシピや販売店の方式に合わせて選んでください。',
        q4: '容器の容量（ml）よりワックスのグラム数が少ないのはなぜ？',
        a4: 'mlは体積で、ワックスは水より軽いためです。溶かしたワックス1 mlは約0.86 gなので、200 mlの容器に入るワックスは約172 gです。また容器の容量は縁まで満杯の値で、実際にはそれより下まで注ぎます。',
        footerHome: '計算機',
        footerPrivacy: 'プライバシーポリシー',
        footerTerms: '利用規約',
        footerNote: '計算結果は目安です。ワックスと香料の販売店の安全上の注意に従ってください。'
    }
};

if (typeof module !== 'undefined') module.exports = { calc, T };

if (typeof document !== 'undefined') {
    const params = new URLSearchParams(location.search);

    // Priority: ?lang= (hreflang targets) > saved choice > browser > en
    let lang = (() => {
        if (LANGS.includes(params.get('lang'))) return params.get('lang');
        try { const s = localStorage.getItem('lang'); if (LANGS.includes(s)) return s; } catch (e) { }
        const b = (navigator.language || '').slice(0, 2).toLowerCase();
        return LANGS.includes(b) ? b : 'en';
    })();
    const t = (k) => T[lang][k] ?? T.en[k];

    const langSelect = document.getElementById('lang');
    const form = document.getElementById('calc');
    let update = () => { };

    function applyLang() {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
        document.querySelectorAll('[data-i18n-content]').forEach((el) => { el.content = t(el.dataset.i18nContent); });
        document.querySelectorAll('.lang-block').forEach((el) => { el.hidden = el.dataset.lang !== lang; });
        langSelect.value = lang;
    }

    // Each ?lang= variant is its own canonical page, so it doesn't fight its hreflang tag
    const canon = document.querySelector('link[rel=canonical]');
    if (canon && LANGS.includes(params.get('lang')) && params.get('lang') !== 'en') {
        canon.href = location.origin + location.pathname + '?lang=' + params.get('lang');
    }

    langSelect.addEventListener('change', () => {
        lang = langSelect.value;
        try { localStorage.setItem('lang', lang); } catch (e) { }
        const u = new URL(location.href);
        u.searchParams.set('lang', lang);
        history.replaceState(null, '', u);
        applyLang();
        update();
    });

    applyLang();

    if (form) {
        const F = form.elements;
        const KEYS = ['count', 'fill', 'unit', 'load', 'method'];
        const ENUMS = { unit: ['floz', 'ml', 'oz', 'g'], method: ['wax', 'total'] };
        const $ = (id) => document.getElementById(id);

        // Restore a shared link. Only known numbers and enum values get in.
        for (const k of ['count', 'fill', 'load']) {
            const v = params.get(k);
            if (v && Number.isFinite(+v)) F[k].value = v;
        }
        for (const k of ['unit', 'method']) {
            if (ENUMS[k].includes(params.get(k))) F[k].value = params.get(k);
        }
        // Metric-first languages start in ml
        if (!params.has('unit') && lang !== 'en') {
            F.unit.value = 'ml';
            if (!params.has('fill')) F.fill.value = 200;
        }

        const num = (v, d) => new Intl.NumberFormat(lang, { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
        const g = (v) => num(v, v >= 100 ? 0 : 1) + ' g';
        const oz = (v) => num(v / G_PER_OZ, 2) + ' oz';

        update = () => {
            const ok = form.checkValidity();
            const r = ok && calc({ count: +F.count.value, fill: +F.fill.value, unit: F.unit.value, load: +F.load.value, method: F.method.value });
            $('out-wax').textContent = ok ? g(r.wax) : '—';
            $('out-wax-oz').textContent = ok ? oz(r.wax) : '';
            $('out-fo').textContent = ok ? g(r.fo) : '—';
            $('out-fo-oz').textContent = ok ? oz(r.fo) : '';
            $('out-each').textContent = ok
                ? t('perCandle').replace('{wax}', g(r.each.wax)).replace('{fo}', g(r.each.fo)).replace('{total}', g(r.each.total))
                : t('invalid');
            // jar fill area is 104 units tall; the top band shows the oil share
            $('jar-oil').setAttribute('height', ok && r.total > 0 ? (104 * r.fo / r.total).toFixed(2) : 0);
        };

        // Inputs go in the URL so a result can be bookmarked or shared. Defaults depend on language, so always spell them out.
        const shareUrl = () => {
            const u = new URL(location.href);
            for (const k of KEYS) u.searchParams.set(k, F[k].value);
            return u.href;
        };

        form.addEventListener('input', () => { update(); history.replaceState(null, '', shareUrl()); });
        form.addEventListener('submit', (e) => e.preventDefault());

        $('print').addEventListener('click', () => window.print());
        $('copy').addEventListener('click', () => {
            const btn = $('copy');
            (navigator.clipboard ? navigator.clipboard.writeText(shareUrl()) : Promise.reject())
                .then(() => {
                    btn.textContent = t('copied');
                    setTimeout(() => { btn.textContent = t('copyLink'); }, 2000);
                }, () => prompt(t('copyLink'), shareUrl()));
        });

        update();
    }
}
