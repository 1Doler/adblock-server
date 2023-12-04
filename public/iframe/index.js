
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
    'use strict';

    /**
     * Функция проверяет, является ли переданный объект инстансом переданного класса.
     * @param object - объект.
     * @param someClass - класс.
     * @returns true, если объект является инстансом переданного класса, иначе - false.
     * @remarks
     * Также проверяет, является ли родительский элемент объекта инстансом переданного класса.
     */
    // eslint-disable-next-line max-len
    const instanceOf = (object, someClass) => {
        if (object) {
            const targetProtoString = Object.prototype.toString.call(someClass.prototype);
            let proto = Object.getPrototypeOf(object);
            while (proto) {
                if (Object.prototype.toString.call(proto) === targetProtoString)
                    return true;
                proto = Object.getPrototypeOf(proto);
            }
        }
        return false;
    };

    /**
     * Функция проверяет, является ли переданный парамент числом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является числом, иначе - false.
     */
    const number = (something) => {
        return typeof something === "number" && !isNaN(something) && isFinite(something);
    };
    /**
     * Функция проверяет, является ли переданный параметр строкой.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является строкой, иначе - false.
     */
    const string = (something) => {
        return typeof something === "string" || instanceOf(something, String);
    };
    /**
     * Функция проверяет, является ли переданный параметр объектом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является объектом, иначе - false.
     */
    const object = (something) => {
        return (typeof something === "object" &&
            !Array.isArray(something) &&
            something !== null);
    };
    /**
     * Функция проверяет, является ли переданный параметр строго объектом.
     * @param something - параметр, который необходимо проверить.
     * @returns true, если переданный параметр является строго объектом, иначе - false.
     * @remarks
     * Под проверкой на строгий объект подрузамевается, что объект создан с только с помощью {} или new Object().
     */
    const strictObject = (something) => {
        return Object.prototype.toString.call(something) === "[object Object]";
    };
    /**
     * Функция проверяет, является ли переданный элемент инстансом класса HTMLElement или Document.
     * @param htmlObj - элемент, который необходимо проверить.
     * @returns true, если переданный элемент является инстансом класса HTMLElement или Document, иначе - false.
     */
    const htmlElement = (htmlObj) => {
        return instanceOf(htmlObj, HTMLElement) || htmlDocumentElement(htmlObj);
    };
    /**
     * Функция проверяет, является ли переданный элемент инстансом класса Document.
     * @param doc - элемент, который необходимо проверить.
     * @returns true, если переданный элемент является инстансом класса Document.
     */
    const htmlDocumentElement = (doc) => {
        return instanceOf(doc, Document);
    };

    /**
     * Проверяет, запущено ли приложение в WebView. Если в функцию не передан UA или win, то они возьмутся автоматически
     * из ближайшего window.
     * @param UA - userAgent пользователя.
     * @param win - window пользователя.
     * @returns true, если приложение запущено в WebView, иначе false.
     */
    const webView = (UA, win) => {
        const currentWin = win instanceof Window ? win : window, ua = (string(UA) ? UA : currentWin.navigator.userAgent).toLowerCase(), standalone = currentWin.navigator["standalone"], safari = /safari/.test(ua), ios = /iphone|ipod|ipad/.test(ua), wv = ua.includes("wv"), AWV = Boolean(ua.match(/(WebView|Android.*(wv|.0.0.0)|Linux; U; Android)/ig));
        return (ios && !standalone && !safari) || wv || AWV;
    };

    /**
     * Проверяет, является ли переданный объект пустым.
     * @param obj - объект, который необходимо проверить.
     * @returns true, если переданный объект является пустым, иначе false.
     */
    const isEmptyObject = (obj) => {
        if (!object(obj))
            throw new Error(`${obj} is not an object`);
        for (const _ in obj)
            return false;
        return true;
    };
    /**
     * Проверяет, является ли переданная строка пустой, если удалить из неё все пробельные символы.
     * @param str - строка, который необходимо проверить.
     * @returns true, если переданная строка является пустой, иначе false.
     */
    const isEmptyString = (str) => {
        if (!string(str))
            throw new Error(`${str} is not a string`);
        return removeSpacesFromString(str).length === 0;
    };
    /**
     * Проверяет истинность переданного значения.
     * @param something - значение, которое необходимо проверить.
     * @returns true, если переданное значение является истинным, иначе false.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean#boolean_coercion
     */
    const isTruthy = (...something) => {
        if (something.length <= 0)
            throw new Error("Function has been called without arguments");
        return Boolean(something[0]);
    };

    /**
     * Проверяет, является ли устройство, на котором запущено приложение, компьютером. Если в функцию не передан UA,
     * то userAgent возьмется из ближайшего window.
     * @param - userAgent пользователя.
     * @returns true, если устройство, на котором запущено приложение, является компьютером, иначе false.
     */
    const desktop = (UA) => {
        return !mobile(UA);
    };
    /**
     * Проверяет, является ли устройство, на котором запущено приложение, мобильным устройством. Если в функцию не передан UA,
     * то userAgent возьмется из ближайшего window.
     * @param UA - userAgent пользователя.
     * @returns true, если  устройство, на котором запущено приложение, является мобильным устройством, иначе false.
     */
    const mobile = (UA) => {
        const ua = (string(UA) ? UA : window.navigator.userAgent).toLowerCase(), reg = /android|webos|iphone|ipad|ipod|blackberry|bb|playbook|iemobile|windows phone|kindle|silk|opera mini/i;
        return reg.test(ua);
    };

    /**
     * Функция предназначена для получения случайного числа заданного порядка (По умолчанию 10).
     * @param len - порядок числа.
     * @returns случайное число заданного порядка.
     */
    const getRandomNumber = (len) => {
        const initialNumber = +`1E${len || 10}`;
        const min = (initialNumber / 10);
        return Math.floor(min + Math.random() * (initialNumber - min));
    };
    /**
     * Преобразует объект в строку, где каждая пара ключ-значение представлена как ключ=значение, а пары разделяются
     * указанным разделителем (по умолчанию "&").
     * @param obj - объект, который необходимо преобразовать в строку.
     * @param separator - разделитель, который является символом, используемым для разделения различных пар ключ-значение
     * в результирующей строке. Если разделитель не указан, функция по умолчанию использует «&».
     * @returns преобразованную из объекта строку или null, если был передан не обьект.
     */
    const objectToString = (obj, separator = "&") => {
        if (!object(obj))
            return null;
        return Object.entries(obj).map(pair => pair.join("=")).join(separator);
    };
    /**
     * Cоздает promise, который разрешается через указанное время (в миллисекундах). Если время не указано или время не является
     * положительным числом, оно разрешается немедленно.
     * @param time - число, представляющее задержку в миллисекундах.
     * @returns промис.
     */
    const delay = (time) => {
        return new Promise(resolve => setTimeout(resolve, (number(time) && time > 0) ? time : 0));
    };
    /**
     * Принимает строку и возвращает новую строку, в которой удалены все пробельные символы.
     * @param str - cтрока, из которой удаляются пробельные символы.
     * @returns новую строку, в которой удалены все пробельные символы.
     */
    const removeSpacesFromString = (str) => {
        if (!string(str))
            throw new Error(`${str} is not a string`);
        return str.replace(/\s/g, "");
    };
    /**
     * Принимает строку и проверяет, начинается ли она с символа «#».  Если нет, он добавляет '#' к строке и возвращает ее.
     * @param id - идентификатор, перед которым может потребоваться '#'.
     * @returns строку с символом «#» в начале.
     */
    const htmlId = (id) => {
        if (!string(id))
            throw new Error("Element id must be a string");
        if (isEmptyString(id))
            throw new Error("Element id cannot be an empty string");
        return /^#.+/.test(id) ? id : `#${id}`;
    };

    var LocationTypes;
    (function (LocationTypes) {
        LocationTypes["OnPage"] = "onpage";
        LocationTypes["SameDomainFrame"] = "samedomainiframe";
        LocationTypes["CrossDomainFrame"] = "crossdomainframe";
    })(LocationTypes || (LocationTypes = {}));
    const PLACEMENT_SYSTEMS = [
        { system: "doubleclick", parameter: "url" },
        { system: "betweendigital", parameter: "ref" },
        { system: "vidroll.ru", parameter: "wpl" },
        { system: "video-play.ru", parameter: "wpl" }
    ];

    /**
     * Представляет собой синглтон, который определяет информацию о текущей локации скрипта
     */
    class MyLocation {
        /**
         * Инстанс класса.
         */
        static _instance;
        /**
         * Локация скрипта.
         */
        _location;
        /**
         * Самый верхний window.
         */
        _topWin;
        /**
         * Самый верхний href.
         */
        _topRef;
        constructor() {
            if (MyLocation._instance)
                return MyLocation._instance;
            MyLocation._instance = this;
            this.analyzeLocation();
        }
        /**
         * Определяет все свойства класса.
         */
        analyzeLocation() {
            let assumedTopRef = window.location.href;
            if (window.top === window) {
                // такая запись для того чтобы инитить readonly свойства в методе, а не в конструкторе
                this._location = LocationTypes.OnPage;
                this._topWin = window;
            }
            else {
                this._topWin = window.top;
                try {
                    window.top?.location.href; // если в кроссдоменном фрейме выбросится ошибка 
                    assumedTopRef = this._topWin.location.href;
                    this._location = LocationTypes.SameDomainFrame;
                }
                catch (_) {
                    this._location = LocationTypes.CrossDomainFrame;
                    assumedTopRef = window.document.referrer || window.location.href;
                }
            }
            // поиск по параметру в других системах 
            for (const { system, parameter } of PLACEMENT_SYSTEMS) {
                if (!assumedTopRef.includes(system))
                    continue;
                const valFromSystem = new URL(assumedTopRef).searchParams.get(parameter);
                if (valFromSystem) {
                    assumedTopRef = valFromSystem;
                    break;
                }
            }
            if (window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0) {
                const topAncestorOrigin = window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1];
                if (topAncestorOrigin.replace(/^(https|http):\/\//, "") !== assumedTopRef.replace(/^(https|http):\/\//, ""))
                    assumedTopRef = topAncestorOrigin;
            }
            this._topRef = assumedTopRef;
        }
        /**
         * Возвращает самый верхний href.
         * @returns самый верхний href.
         */
        get topReferrer() {
            return this._topRef;
        }
        /**
         * Возвращает cамый верхний window.
         * @returns cамый верхний window.
         */
        get topWindow() {
            return this._topWin;
        }
        /**
         * Определяет, размещен ли скрипт напрямую на странице.
         * @returns true, если скрипт размещен напрямую на странице, и false - если внутри фрейма.
         */
        get onPage() {
            return this._location === LocationTypes.OnPage;
        }
        /**
         * Определяет, находится ли скрипт внутри кроссдоменного фрейма.
         * @returns true, если скрипт находится внутри кроссдоменного фрейма, иначе false.
         */
        get inCrossDomainFrame() {
            return this._location === LocationTypes.CrossDomainFrame;
        }
        /**
         * Определяет, находится ли скрипт, внутри фрейма на том же домене.
         * @returns true, если скрипт находится внутри фрейма на том же домене, иначе false.
         */
        get inSameDomainFrame() {
            return this._location === LocationTypes.SameDomainFrame;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkParam = (context, paramName) => {
        switch (context?.[paramName]) {
            case true:
                return 1;
            case false:
                return 0;
            default:
                return -1;
        }
    };
    const basicCustomMap = {
        113: context => {
            // приводим secondaryParams к boolean 
            const ctx = context && "secondaryParams" in context ? { secondaryParams: Boolean(context.secondaryParams) } : context;
            return checkParam(ctx, "secondaryParams");
        },
        115: context => context?.methodOfDeterminingVisibility ?? -1,
        116: context => context?.appID ?? -1,
        117: context => context?.ifa ?? -1,
        118: context => context?.sdkVersion ?? -1,
        119: context => context?.sdkName ?? -1,
        161: context => context?.width ?? -1,
        162: context => context?.height ?? -1,
        163: () => new MyLocation().topReferrer ?? -1,
        165: context => {
            if (context && "getViewablePercent" in context) {
                const percent = context.getViewablePercent?.();
                if (number(percent) && +percent !== -1)
                    return (+percent).toFixed(1);
            }
            return -1;
        },
        168: () => {
            const myLocation = new MyLocation();
            if (myLocation.onPage)
                return 1;
            if (myLocation.inCrossDomainFrame)
                return 2;
            if (myLocation.inSameDomainFrame)
                return 3;
            return -1;
        },
        176: context => {
            if (number(context?.startTime))
                return new Date().getTime() - context.startTime;
            return -1;
        },
        177: context => checkParam(context, "measurable"),
        213: () => window?.location?.ancestorOrigins?.length ?? -1,
        214: () => window?.history?.length ?? -1,
        215: () => window?.navigator?.userAgent ?? -1,
        216: () => window?.screen?.width ?? -1,
        217: () => window?.screen?.height ?? -1,
        218: context => checkParam(context, "isFullscreenMode"),
        226: () => {
            if (desktop())
                return 1;
            return webView() ? 3 : 2;
        },
        227: context => checkParam(context, "absoluteVisible"),
    }; // eslint-disable-line @typescript-eslint/no-explicit-any

    /**
     *  Предназначен для сбора пользовательских данных из контекста объекта.
     */
    class CustomCollector {
        /**
         * Объект, из которого будут браться значения кастомов.
         */
        context;
        /**
         * Объект, в который собираются кастомы.
         */
        collectedCustoms;
        /**
         * Карта, в которой описывается каким образом достаются конкретные кастомы.
         */
        customMap;
        /**
         * @param customMap - карта, в которой описывается каким образом достаются конкретные кастомы.
         */
        constructor(customMap) {
            if (!strictObject(customMap))
                this.customMap = basicCustomMap;
            else if (!Object.entries(customMap).some(([key, val]) => number(+key) && typeof val === "function"))
                throw new TypeError("CustomCollector: invalid custom map.");
            else
                this.customMap = customMap;
            this.collectedCustoms = {};
        }
        /**
         * Задает объект, из которого будут браться значения кастомов.
         * @param context - объект, из которого будут браться значения кастомов.
         * @returns this.
         */
        collectFrom(context) {
            if (!strictObject(context))
                throw new TypeError("CustomCollector: the context must be an object.");
            if (isEmptyObject(context))
                throw new TypeError("CustomCollector: empty context was passed.");
            this.context = context;
            return this;
        }
        /**
         * Заполняет кастомы в collectedCustoms, перечисленные в customList.
         * @param customList - массив с номерами кастомов.
         * @returns this.
         */
        collect(customList) {
            if (!Array.isArray(customList))
                throw new TypeError("CustomCollector: there is no custom list.");
            if (!this.context)
                throw new Error("CustomCollector: missing context.");
            for (const customNum of customList) {
                if (number(customNum))
                    this.collectedCustoms[customNum] =
                        (typeof this.customMap[customNum] === "function" ? this.customMap[customNum](this.context) : null) ?? -1;
            }
            return this;
        }
        /**
         * Удаляет все кастомы из collectedCustoms.
         * @returns this.
         */
        clear() {
            for (const key in this.collectedCustoms)
                delete this.collectedCustoms[key];
            return this;
        }
        /**
         * Предназначен для возврата строки с собранными кастомами.
         * @returns строку с собранными кастомами.
         * @remarks возвращаемая строка в формате <customNum>=<customVal>;
         */
        toString() {
            return objectToString(this.collectedCustoms, ";");
        }
    }

    /**
     * Устанавливает свойства элемента с помощью функции установки свойств.
     * @param element - элемент, для которого устанавливаются свойства.
     * @param properties - свойства для установки.
     * @param propertySetter - функция установки свойства.
     */
    const setProperties = (element, properties, propertySetter) => {
        if ((!htmlElement(element) && !(element instanceof SVGElement)) || !strictObject(properties))
            return;
        for (const property in properties) {
            const value = number(properties[property]) ? String(properties[property]) : properties[property];
            if (string(value) && !isEmptyString(value)) {
                propertySetter(element, property, value);
            }
        }
    };
    /**
     * Устанавливает стили для элемента.
     * @param element - элемент, для которого устанавливаются стили.
     * @param styles - устанавливаемые стили.
     */
    const setStyles = (element, styles) => setProperties(element, styles, (el, prop, val) => el.style.setProperty(prop, val));

    const IOS_WEBKIT_VIDEO_FS_API = {
        displayingFullscreen: "webkitDisplayingFullscreen",
        requestFullscreen: "webkitEnterFullscreen",
        exitFullscreen: "webkitExitFullscreen",
        fullscreenEnabled: "webkitSupportsFullscreen"
    };
    var Vendors;
    (function (Vendors) {
        Vendors["Webkit"] = "webkit";
        Vendors["Moz"] = "moz";
        Vendors["Ms"] = "ms";
        Vendors["Web"] = "web";
        Vendors["DisabledWebkit"] = "webkit_ios";
        Vendors["Unknown"] = "unknown";
    })(Vendors || (Vendors = {}));
    const FS_API = {
        [Vendors.Webkit]: {
            fullscreenEnabled: "webkitFullscreenEnabled",
            fullscreenElement: "webkitFullscreenElement",
            requestFullscreen: "webkitRequestFullscreen",
            exitFullscreen: "webkitExitFullscreen",
            fullscreenChangeEvent: "webkitfullscreenchange",
            fullscreenErrorEvent: "webkitfullscreenerror",
            pseudoClass: "-webkit-full-screen"
        },
        [Vendors.Moz]: {
            fullscreenEnabled: "mozFullScreenEnabled",
            fullscreenElement: "mozFullScreenElement",
            requestFullscreen: "mozRequestFullScreen",
            exitFullscreen: "mozCancelFullScreen",
            fullscreenChangeEvent: "mozfullscreenchange",
            fullscreenErrorEvent: "mozfullscreenerror",
            pseudoClass: "-moz-full-screen"
        },
        [Vendors.Ms]: {
            fullscreenEnabled: "msFullscreenEnabled",
            fullscreenElement: "msFullscreenElement",
            requestFullscreen: "msRequestFullscreen",
            exitFullscreen: "msExitFullscreen",
            fullscreenChangeEvent: "MSFullscreenChange",
            fullscreenErrorEvent: "MSFullscreenError",
            pseudoClass: "-ms-fullscreen"
        },
        [Vendors.Web]: {
            fullscreenEnabled: "fullscreenEnabled",
            fullscreenElement: "fullscreenElement",
            requestFullscreen: "requestFullscreen",
            exitFullscreen: "exitFullscreen",
            fullscreenChangeEvent: "fullscreenchange",
            fullscreenErrorEvent: "fullscreenerror",
            pseudoClass: "fullscreen",
        }
    };

    let vendor;
    /**
     * Функция для получения вендора Fullscreen API.
     *
     * @returns Название вендора Fullscreen API.
     *
     * @remarks
     * Если вендор не удалось определить, функция возращает `Vendors.Unknown`
     * Если вендор уже был определен ранее, функция возвращает его без повторной проверки.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
     */
    const getVendor = () => {
        if (!vendor) {
            if (FS_API[Vendors.Web].fullscreenEnabled in window.document)
                vendor = Vendors.Web;
            else if (FS_API[Vendors.Webkit].fullscreenEnabled in window.document)
                vendor = Vendors.Webkit;
            else if (FS_API[Vendors.Moz].fullscreenEnabled in window.document)
                vendor = Vendors.Moz;
            else if (FS_API[Vendors.Ms].fullscreenEnabled in window.document)
                vendor = Vendors.Ms;
            else {
                // Создание временного элемента video для проверки поддержки специфического API полноэкранного режима для iOS
                const videoEl = document.createElement("video");
                // Проверка, поддерживается ли API полноэкранного режима для iOS
                if (IOS_WEBKIT_VIDEO_FS_API.displayingFullscreen in videoEl)
                    vendor = Vendors.DisabledWebkit;
                else
                    vendor = Vendors.Unknown;
            }
        }
        return vendor;
    };

    /**
     * Проверяет, находится ли указанный элемент (или любой элемент, если элемент не указан)
     * в полноэкранном режиме.
     *
     * @param element - элемент для проверки. Если не указан, проверяется наличие любого элемента
     * в полноэкранном режиме.
     * @param doc - документ, в контексте которого выполняется проверка.
     * По умолчанию используется глобальный объект `window.document`.
     *
     * @returns boolean | null - возвращает `true`, если указанный элемент (или любой элемент, если
     * элемент не указан) находится в полноэкранном режиме. Возвращает `false`, если элемент
     * не находится в полноэкранном режиме. Возвращает `null` в случае, если невозможно определить состояние
     * полноэкранного режима.
     */
    const checkMode = (element, doc) => {
        const vendor = getVendor();
        const currentDoc = htmlDocumentElement(doc) ? doc : window.document;
        // Если вендор неизвестен, возвращаем null, т.к. невозможно определить
        // находиться ли элемент в полноэкранном режиме.
        if (vendor === Vendors.Unknown)
            return null;
        // Проверяем, является ли предоставленный элемент действительным инстансом класса HTMLElement.
        if ((element !== null && element !== undefined) && !htmlElement(element))
            return null;
        // Проверка для элемента video на iOS.
        if (instanceOf(element, HTMLVideoElement)) {
            if (vendor === Vendors.Webkit && IOS_WEBKIT_VIDEO_FS_API.displayingFullscreen in element) {
                return element[IOS_WEBKIT_VIDEO_FS_API.displayingFullscreen] ?? null;
            }
            if (vendor === Vendors.DisabledWebkit && IOS_WEBKIT_VIDEO_FS_API.displayingFullscreen in element) {
                return element[IOS_WEBKIT_VIDEO_FS_API.displayingFullscreen] ?? null;
            }
        }
        if (vendor === Vendors.DisabledWebkit) {
            if (!element) {
                if (FS_API.web.fullscreenElement in currentDoc) // в некоторых ios 16+
                    return Boolean(currentDoc[FS_API[Vendors.Web].fullscreenElement]);
                else // если нет fullscreenElement, то больше никак не проверить
                    return null;
            }
            else // в ios в фуллскрин можно включать только на видео элементах, если не видео элемент, то точно не в фуллскрин  
                return false;
        }
        // Для всех остальных вендоров
        if (element)
            return FS_API[vendor].fullscreenElement in currentDoc ?
                currentDoc[FS_API[vendor].fullscreenElement] === element : null;
        else
            return FS_API[vendor].fullscreenElement in currentDoc ?
                Boolean(currentDoc[FS_API[vendor].fullscreenElement]) : null;
    };

    /**
     * Класс URI расширяет класс URL и добавляет дополнительные функции.
     */
    class URI extends URL {
        /**
         * Массив объектов macrosData, каждый из которых содержит значение и шаблон RegExp.
         */
        macrosList = [];
        /**
         * Проверяет, имеет ли данная строка протокол http или https.
         * @param str - строка для проверки протокола.
         * @returns true, если строка имеет протокол http или https, иначе false.
         */
        static hasProtocol(str) {
            return /^(https|http):\/\/.+/.test(str);
        }
        /**
         * @param str - cтрока URL. Если протокол не указан, автоматически добавляется «https:».
         */
        constructor(str) {
            const url = URI.hasProtocol(str) ? str : "https:" + str;
            super(url);
            // safari в iOS 13 и меньше, игнорирует наследование некоторых классов, если посмотреть прототип,
            // то там будут добавлены методы, но у экземпляра этого класса, будут методы только класса от которого наследуемся.
            // чтобы обойти это, явно устанавливаем прототип 
            Object.setPrototypeOf(this, URI.prototype);
        }
        /**
         * Задает макрос, который можно заменить в строке URL.
         * @param macros - имя макроса.
         * @param value - значение для замены макроса.
         * @returns this.
         */
        setMacros(macros, value) {
            value = value?.toString();
            if (string(macros) && !isEmptyString(macros) && !isEmptyString(value)) {
                macros = macros.replace(/[^a-zA-Z0-9 ]/g, "");
                const template = new RegExp(`\\!\\[${macros}\\]`);
                const obj = { value, template };
                this.macrosList.push(obj);
            }
            return this;
        }
        /**
         * Устанавливает макрос "rnd" со случайным числовым значением.
         * @returns this.
         */
        setRnd() {
            this.setMacros("rnd", getRandomNumber(6));
            return this;
        }
        /**
         * Задает параметры запроса в URL.
         * @param params - объект, в котором каждая пара ключ-значение представляет параметр запроса и его значение.
         * @returns this.
         */
        setParams(params) {
            if (strictObject(params))
                for (const param in params)
                    this.searchParams.set(param, params[param].toString());
            return this;
        }
        /**
         * Возвращает строку URL.
         * @returns строку URL.
         */
        toString() {
            let res = decodeURIComponent(super.toString());
            for (const { value, template } of this.macrosList)
                res = res.replace(template, value);
            return new URL(res).toString();
        }
        /**
         * Гарантирует, что URL использует https протокол.
         * @returns this.
         */
        httpslize() {
            if (this.protocol !== "https:")
                this.protocol = "https:";
            return this;
        }
    }

    /**
     * Класс, который организует событийную модель общения между объектами, то есть, дает возможность
     * подписаться на событие, вызвать это событие, и отписаться от события.
     */
    class EventCollector {
        /**
         * Хеш таблица событий, где ключом служит тип события, а значением, массив с обработчиками.
         */
        eventMap;
        constructor() {
            this.eventMap = Object.create(null);
        }
        /**
         * Подписывает на событие.
         * @param eventName - тип события.
         * @param fn - обработчик события (коллбек).
         * @remarks
         * Если переданное событие будет не строкой или пустой строкой, или обработчик события будет не функцией,
         * подписки на событие не произойдет.
         */
        subscribe(eventName, fn) {
            if (!string(eventName) ||
                isEmptyString(eventName) ||
                typeof fn !== "function")
                return;
            if (!this.eventMap[eventName])
                this.eventMap[eventName] = [];
            this.eventMap[eventName].push(fn);
        }
        /**
         * Отписывает от всех событий.
         */
        clear() {
            for (const key in this.eventMap)
                delete this.eventMap[key];
        }
        /**
         * Вызывает событие.
         * @param eventName - тип события.
         * @param eventObject - параметры, с которыми будет вызван обработчик.
         */
        triggerEvent(eventName, ...eventObject) {
            if (!string(eventName))
                return;
            if (this.eventMap[eventName])
                this.eventMap[eventName]
                    .forEach(fn => fn(...eventObject));
        }
        /**
         * Отписывает от события.
         * @param eventName - тип события.
         * @param fn - обработчик события (коллбек).
         * @remarks
         * Если передать тип события и обработчик этого события, то отписка произойдет для конкретного обработчика.
         * Если передать только тип события, то отписка произойдет для всех обработчиков данного события.
         */
        unsubscribe(eventName, fn) {
            if (!string(eventName) ||
                !Array.isArray(this.eventMap[eventName]))
                return;
            if (typeof fn === "function") {
                const len = this.eventMap[eventName].length;
                for (let i = 0; i < len; i++) {
                    const cb = this.eventMap[eventName][i];
                    if (fn === cb) {
                        this.eventMap[eventName][i] = this.eventMap[eventName][len - 1];
                        this.eventMap[eventName].length -= 1;
                    }
                }
            }
            else
                delete this.eventMap[eventName];
        }
    }

    /**
     * Copyright 2016 Google Inc. All Rights Reserved.
     *
     * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
     *
     *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
     *
     */
    (function() {

    // Exit early if we're not running in a browser.
    if (typeof window !== 'object') {
      return;
    }

    // Exit early if all IntersectionObserver and IntersectionObserverEntry
    // features are natively supported.
    if ('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype) {

      // Minimal polyfill for Edge 15's lack of `isIntersecting`
      // See: https://github.com/w3c/IntersectionObserver/issues/211
      if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
        Object.defineProperty(window.IntersectionObserverEntry.prototype,
          'isIntersecting', {
          get: function () {
            return this.intersectionRatio > 0;
          }
        });
      }
      return;
    }

    /**
     * Returns the embedding frame element, if any.
     * @param {!Document} doc
     * @return {!Element}
     */
    function getFrameElement(doc) {
      try {
        return doc.defaultView && doc.defaultView.frameElement || null;
      } catch (e) {
        // Ignore the error.
        return null;
      }
    }

    /**
     * A local reference to the root document.
     */
    var document = (function(startDoc) {
      var doc = startDoc;
      var frame = getFrameElement(doc);
      while (frame) {
        doc = frame.ownerDocument;
        frame = getFrameElement(doc);
      }
      return doc;
    })(window.document);

    /**
     * An IntersectionObserver registry. This registry exists to hold a strong
     * reference to IntersectionObserver instances currently observing a target
     * element. Without this registry, instances without another reference may be
     * garbage collected.
     */
    var registry = [];

    /**
     * The signal updater for cross-origin intersection. When not null, it means
     * that the polyfill is configured to work in a cross-origin mode.
     * @type {function(DOMRect|ClientRect, DOMRect|ClientRect)}
     */
    var crossOriginUpdater = null;

    /**
     * The current cross-origin intersection. Only used in the cross-origin mode.
     * @type {DOMRect|ClientRect}
     */
    var crossOriginRect = null;


    /**
     * Creates the global IntersectionObserverEntry constructor.
     * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
     * @param {Object} entry A dictionary of instance properties.
     * @constructor
     */
    function IntersectionObserverEntry(entry) {
      this.time = entry.time;
      this.target = entry.target;
      this.rootBounds = ensureDOMRect(entry.rootBounds);
      this.boundingClientRect = ensureDOMRect(entry.boundingClientRect);
      this.intersectionRect = ensureDOMRect(entry.intersectionRect || getEmptyRect());
      this.isIntersecting = !!entry.intersectionRect;

      // Calculates the intersection ratio.
      var targetRect = this.boundingClientRect;
      var targetArea = targetRect.width * targetRect.height;
      var intersectionRect = this.intersectionRect;
      var intersectionArea = intersectionRect.width * intersectionRect.height;

      // Sets intersection ratio.
      if (targetArea) {
        // Round the intersection ratio to avoid floating point math issues:
        // https://github.com/w3c/IntersectionObserver/issues/324
        this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
      } else {
        // If area is zero and is intersecting, sets to 1, otherwise to 0
        this.intersectionRatio = this.isIntersecting ? 1 : 0;
      }
    }


    /**
     * Creates the global IntersectionObserver constructor.
     * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
     * @param {Function} callback The function to be invoked after intersection
     *     changes have queued. The function is not invoked if the queue has
     *     been emptied by calling the `takeRecords` method.
     * @param {Object=} opt_options Optional configuration options.
     * @constructor
     */
    function IntersectionObserver(callback, opt_options) {

      var options = opt_options || {};

      if (typeof callback != 'function') {
        throw new Error('callback must be a function');
      }

      if (
        options.root &&
        options.root.nodeType != 1 &&
        options.root.nodeType != 9
      ) {
        throw new Error('root must be a Document or Element');
      }

      // Binds and throttles `this._checkForIntersections`.
      this._checkForIntersections = throttle(
          this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);

      // Private properties.
      this._callback = callback;
      this._observationTargets = [];
      this._queuedEntries = [];
      this._rootMarginValues = this._parseRootMargin(options.rootMargin);

      // Public properties.
      this.thresholds = this._initThresholds(options.threshold);
      this.root = options.root || null;
      this.rootMargin = this._rootMarginValues.map(function(margin) {
        return margin.value + margin.unit;
      }).join(' ');

      /** @private @const {!Array<!Document>} */
      this._monitoringDocuments = [];
      /** @private @const {!Array<function()>} */
      this._monitoringUnsubscribes = [];
    }


    /**
     * The minimum interval within which the document will be checked for
     * intersection changes.
     */
    IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;


    /**
     * The frequency in which the polyfill polls for intersection changes.
     * this can be updated on a per instance basis and must be set prior to
     * calling `observe` on the first target.
     */
    IntersectionObserver.prototype.POLL_INTERVAL = null;

    /**
     * Use a mutation observer on the root element
     * to detect intersection changes.
     */
    IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;


    /**
     * Sets up the polyfill in the cross-origin mode. The result is the
     * updater function that accepts two arguments: `boundingClientRect` and
     * `intersectionRect` - just as these fields would be available to the
     * parent via `IntersectionObserverEntry`. This function should be called
     * each time the iframe receives intersection information from the parent
     * window, e.g. via messaging.
     * @return {function(DOMRect|ClientRect, DOMRect|ClientRect)}
     */
    IntersectionObserver._setupCrossOriginUpdater = function() {
      if (!crossOriginUpdater) {
        /**
         * @param {DOMRect|ClientRect} boundingClientRect
         * @param {DOMRect|ClientRect} intersectionRect
         */
        crossOriginUpdater = function(boundingClientRect, intersectionRect) {
          if (!boundingClientRect || !intersectionRect) {
            crossOriginRect = getEmptyRect();
          } else {
            crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
          }
          registry.forEach(function(observer) {
            observer._checkForIntersections();
          });
        };
      }
      return crossOriginUpdater;
    };


    /**
     * Resets the cross-origin mode.
     */
    IntersectionObserver._resetCrossOriginUpdater = function() {
      crossOriginUpdater = null;
      crossOriginRect = null;
    };


    /**
     * Starts observing a target element for intersection changes based on
     * the thresholds values.
     * @param {Element} target The DOM element to observe.
     */
    IntersectionObserver.prototype.observe = function(target) {
      var isTargetAlreadyObserved = this._observationTargets.some(function(item) {
        return item.element == target;
      });

      if (isTargetAlreadyObserved) {
        return;
      }

      if (!(target && target.nodeType == 1)) {
        throw new Error('target must be an Element');
      }

      this._registerInstance();
      this._observationTargets.push({element: target, entry: null});
      this._monitorIntersections(target.ownerDocument);
      this._checkForIntersections();
    };


    /**
     * Stops observing a target element for intersection changes.
     * @param {Element} target The DOM element to observe.
     */
    IntersectionObserver.prototype.unobserve = function(target) {
      this._observationTargets =
          this._observationTargets.filter(function(item) {
            return item.element != target;
          });
      this._unmonitorIntersections(target.ownerDocument);
      if (this._observationTargets.length == 0) {
        this._unregisterInstance();
      }
    };


    /**
     * Stops observing all target elements for intersection changes.
     */
    IntersectionObserver.prototype.disconnect = function() {
      this._observationTargets = [];
      this._unmonitorAllIntersections();
      this._unregisterInstance();
    };


    /**
     * Returns any queue entries that have not yet been reported to the
     * callback and clears the queue. This can be used in conjunction with the
     * callback to obtain the absolute most up-to-date intersection information.
     * @return {Array} The currently queued entries.
     */
    IntersectionObserver.prototype.takeRecords = function() {
      var records = this._queuedEntries.slice();
      this._queuedEntries = [];
      return records;
    };


    /**
     * Accepts the threshold value from the user configuration object and
     * returns a sorted array of unique threshold values. If a value is not
     * between 0 and 1 and error is thrown.
     * @private
     * @param {Array|number=} opt_threshold An optional threshold value or
     *     a list of threshold values, defaulting to [0].
     * @return {Array} A sorted list of unique and valid threshold values.
     */
    IntersectionObserver.prototype._initThresholds = function(opt_threshold) {
      var threshold = opt_threshold || [0];
      if (!Array.isArray(threshold)) threshold = [threshold];

      return threshold.sort().filter(function(t, i, a) {
        if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
          throw new Error('threshold must be a number between 0 and 1 inclusively');
        }
        return t !== a[i - 1];
      });
    };


    /**
     * Accepts the rootMargin value from the user configuration object
     * and returns an array of the four margin values as an object containing
     * the value and unit properties. If any of the values are not properly
     * formatted or use a unit other than px or %, and error is thrown.
     * @private
     * @param {string=} opt_rootMargin An optional rootMargin value,
     *     defaulting to '0px'.
     * @return {Array<Object>} An array of margin objects with the keys
     *     value and unit.
     */
    IntersectionObserver.prototype._parseRootMargin = function(opt_rootMargin) {
      var marginString = opt_rootMargin || '0px';
      var margins = marginString.split(/\s+/).map(function(margin) {
        var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
        if (!parts) {
          throw new Error('rootMargin must be specified in pixels or percent');
        }
        return {value: parseFloat(parts[1]), unit: parts[2]};
      });

      // Handles shorthand.
      margins[1] = margins[1] || margins[0];
      margins[2] = margins[2] || margins[0];
      margins[3] = margins[3] || margins[1];

      return margins;
    };


    /**
     * Starts polling for intersection changes if the polling is not already
     * happening, and if the page's visibility state is visible.
     * @param {!Document} doc
     * @private
     */
    IntersectionObserver.prototype._monitorIntersections = function(doc) {
      var win = doc.defaultView;
      if (!win) {
        // Already destroyed.
        return;
      }
      if (this._monitoringDocuments.indexOf(doc) != -1) {
        // Already monitoring.
        return;
      }

      // Private state for monitoring.
      var callback = this._checkForIntersections;
      var monitoringInterval = null;
      var domObserver = null;

      // If a poll interval is set, use polling instead of listening to
      // resize and scroll events or DOM mutations.
      if (this.POLL_INTERVAL) {
        monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
      } else {
        addEvent(win, 'resize', callback, true);
        addEvent(doc, 'scroll', callback, true);
        if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in win) {
          domObserver = new win.MutationObserver(callback);
          domObserver.observe(doc, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: true
          });
        }
      }

      this._monitoringDocuments.push(doc);
      this._monitoringUnsubscribes.push(function() {
        // Get the window object again. When a friendly iframe is destroyed, it
        // will be null.
        var win = doc.defaultView;

        if (win) {
          if (monitoringInterval) {
            win.clearInterval(monitoringInterval);
          }
          removeEvent(win, 'resize', callback, true);
        }

        removeEvent(doc, 'scroll', callback, true);
        if (domObserver) {
          domObserver.disconnect();
        }
      });

      // Also monitor the parent.
      var rootDoc =
        (this.root && (this.root.ownerDocument || this.root)) || document;
      if (doc != rootDoc) {
        var frame = getFrameElement(doc);
        if (frame) {
          this._monitorIntersections(frame.ownerDocument);
        }
      }
    };


    /**
     * Stops polling for intersection changes.
     * @param {!Document} doc
     * @private
     */
    IntersectionObserver.prototype._unmonitorIntersections = function(doc) {
      var index = this._monitoringDocuments.indexOf(doc);
      if (index == -1) {
        return;
      }

      var rootDoc =
        (this.root && (this.root.ownerDocument || this.root)) || document;

      // Check if any dependent targets are still remaining.
      var hasDependentTargets =
          this._observationTargets.some(function(item) {
            var itemDoc = item.element.ownerDocument;
            // Target is in this context.
            if (itemDoc == doc) {
              return true;
            }
            // Target is nested in this context.
            while (itemDoc && itemDoc != rootDoc) {
              var frame = getFrameElement(itemDoc);
              itemDoc = frame && frame.ownerDocument;
              if (itemDoc == doc) {
                return true;
              }
            }
            return false;
          });
      if (hasDependentTargets) {
        return;
      }

      // Unsubscribe.
      var unsubscribe = this._monitoringUnsubscribes[index];
      this._monitoringDocuments.splice(index, 1);
      this._monitoringUnsubscribes.splice(index, 1);
      unsubscribe();

      // Also unmonitor the parent.
      if (doc != rootDoc) {
        var frame = getFrameElement(doc);
        if (frame) {
          this._unmonitorIntersections(frame.ownerDocument);
        }
      }
    };


    /**
     * Stops polling for intersection changes.
     * @param {!Document} doc
     * @private
     */
    IntersectionObserver.prototype._unmonitorAllIntersections = function() {
      var unsubscribes = this._monitoringUnsubscribes.slice(0);
      this._monitoringDocuments.length = 0;
      this._monitoringUnsubscribes.length = 0;
      for (var i = 0; i < unsubscribes.length; i++) {
        unsubscribes[i]();
      }
    };


    /**
     * Scans each observation target for intersection changes and adds them
     * to the internal entries queue. If new entries are found, it
     * schedules the callback to be invoked.
     * @private
     */
    IntersectionObserver.prototype._checkForIntersections = function() {
      if (!this.root && crossOriginUpdater && !crossOriginRect) {
        // Cross origin monitoring, but no initial data available yet.
        return;
      }

      var rootIsInDom = this._rootIsInDom();
      var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

      this._observationTargets.forEach(function(item) {
        var target = item.element;
        var targetRect = getBoundingClientRect(target);
        var rootContainsTarget = this._rootContainsTarget(target);
        var oldEntry = item.entry;
        var intersectionRect = rootIsInDom && rootContainsTarget &&
            this._computeTargetAndRootIntersection(target, targetRect, rootRect);

        var rootBounds = null;
        if (!this._rootContainsTarget(target)) {
          rootBounds = getEmptyRect();
        } else if (!crossOriginUpdater || this.root) {
          rootBounds = rootRect;
        }

        var newEntry = item.entry = new IntersectionObserverEntry({
          time: now(),
          target: target,
          boundingClientRect: targetRect,
          rootBounds: rootBounds,
          intersectionRect: intersectionRect
        });

        if (!oldEntry) {
          this._queuedEntries.push(newEntry);
        } else if (rootIsInDom && rootContainsTarget) {
          // If the new entry intersection ratio has crossed any of the
          // thresholds, add a new entry.
          if (this._hasCrossedThreshold(oldEntry, newEntry)) {
            this._queuedEntries.push(newEntry);
          }
        } else {
          // If the root is not in the DOM or target is not contained within
          // root but the previous entry for this target had an intersection,
          // add a new record indicating removal.
          if (oldEntry && oldEntry.isIntersecting) {
            this._queuedEntries.push(newEntry);
          }
        }
      }, this);

      if (this._queuedEntries.length) {
        this._callback(this.takeRecords(), this);
      }
    };


    /**
     * Accepts a target and root rect computes the intersection between then
     * following the algorithm in the spec.
     * TODO(philipwalton): at this time clip-path is not considered.
     * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
     * @param {Element} target The target DOM element
     * @param {Object} targetRect The bounding rect of the target.
     * @param {Object} rootRect The bounding rect of the root after being
     *     expanded by the rootMargin value.
     * @return {?Object} The final intersection rect object or undefined if no
     *     intersection is found.
     * @private
     */
    IntersectionObserver.prototype._computeTargetAndRootIntersection =
        function(target, targetRect, rootRect) {
      // If the element isn't displayed, an intersection can't happen.
      if (window.getComputedStyle(target).display == 'none') return;

      var intersectionRect = targetRect;
      var parent = getParentNode(target);
      var atRoot = false;

      while (!atRoot && parent) {
        var parentRect = null;
        var parentComputedStyle = parent.nodeType == 1 ?
            window.getComputedStyle(parent) : {};

        // If the parent isn't displayed, an intersection can't happen.
        if (parentComputedStyle.display == 'none') return null;

        if (parent == this.root || parent.nodeType == /* DOCUMENT */ 9) {
          atRoot = true;
          if (parent == this.root || parent == document) {
            if (crossOriginUpdater && !this.root) {
              if (!crossOriginRect ||
                  crossOriginRect.width == 0 && crossOriginRect.height == 0) {
                // A 0-size cross-origin intersection means no-intersection.
                parent = null;
                parentRect = null;
                intersectionRect = null;
              } else {
                parentRect = crossOriginRect;
              }
            } else {
              parentRect = rootRect;
            }
          } else {
            // Check if there's a frame that can be navigated to.
            var frame = getParentNode(parent);
            var frameRect = frame && getBoundingClientRect(frame);
            var frameIntersect =
                frame &&
                this._computeTargetAndRootIntersection(frame, frameRect, rootRect);
            if (frameRect && frameIntersect) {
              parent = frame;
              parentRect = convertFromParentRect(frameRect, frameIntersect);
            } else {
              parent = null;
              intersectionRect = null;
            }
          }
        } else {
          // If the element has a non-visible overflow, and it's not the <body>
          // or <html> element, update the intersection rect.
          // Note: <body> and <html> cannot be clipped to a rect that's not also
          // the document rect, so no need to compute a new intersection.
          var doc = parent.ownerDocument;
          if (parent != doc.body &&
              parent != doc.documentElement &&
              parentComputedStyle.overflow != 'visible') {
            parentRect = getBoundingClientRect(parent);
          }
        }

        // If either of the above conditionals set a new parentRect,
        // calculate new intersection data.
        if (parentRect) {
          intersectionRect = computeRectIntersection(parentRect, intersectionRect);
        }
        if (!intersectionRect) break;
        parent = parent && getParentNode(parent);
      }
      return intersectionRect;
    };


    /**
     * Returns the root rect after being expanded by the rootMargin value.
     * @return {ClientRect} The expanded root rect.
     * @private
     */
    IntersectionObserver.prototype._getRootRect = function() {
      var rootRect;
      if (this.root && !isDoc(this.root)) {
        rootRect = getBoundingClientRect(this.root);
      } else {
        // Use <html>/<body> instead of window since scroll bars affect size.
        var doc = isDoc(this.root) ? this.root : document;
        var html = doc.documentElement;
        var body = doc.body;
        rootRect = {
          top: 0,
          left: 0,
          right: html.clientWidth || body.clientWidth,
          width: html.clientWidth || body.clientWidth,
          bottom: html.clientHeight || body.clientHeight,
          height: html.clientHeight || body.clientHeight
        };
      }
      return this._expandRectByRootMargin(rootRect);
    };


    /**
     * Accepts a rect and expands it by the rootMargin value.
     * @param {DOMRect|ClientRect} rect The rect object to expand.
     * @return {ClientRect} The expanded rect.
     * @private
     */
    IntersectionObserver.prototype._expandRectByRootMargin = function(rect) {
      var margins = this._rootMarginValues.map(function(margin, i) {
        return margin.unit == 'px' ? margin.value :
            margin.value * (i % 2 ? rect.width : rect.height) / 100;
      });
      var newRect = {
        top: rect.top - margins[0],
        right: rect.right + margins[1],
        bottom: rect.bottom + margins[2],
        left: rect.left - margins[3]
      };
      newRect.width = newRect.right - newRect.left;
      newRect.height = newRect.bottom - newRect.top;

      return newRect;
    };


    /**
     * Accepts an old and new entry and returns true if at least one of the
     * threshold values has been crossed.
     * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
     *    particular target element or null if no previous entry exists.
     * @param {IntersectionObserverEntry} newEntry The current entry for a
     *    particular target element.
     * @return {boolean} Returns true if a any threshold has been crossed.
     * @private
     */
    IntersectionObserver.prototype._hasCrossedThreshold =
        function(oldEntry, newEntry) {

      // To make comparing easier, an entry that has a ratio of 0
      // but does not actually intersect is given a value of -1
      var oldRatio = oldEntry && oldEntry.isIntersecting ?
          oldEntry.intersectionRatio || 0 : -1;
      var newRatio = newEntry.isIntersecting ?
          newEntry.intersectionRatio || 0 : -1;

      // Ignore unchanged ratios
      if (oldRatio === newRatio) return;

      for (var i = 0; i < this.thresholds.length; i++) {
        var threshold = this.thresholds[i];

        // Return true if an entry matches a threshold or if the new ratio
        // and the old ratio are on the opposite sides of a threshold.
        if (threshold == oldRatio || threshold == newRatio ||
            threshold < oldRatio !== threshold < newRatio) {
          return true;
        }
      }
    };


    /**
     * Returns whether or not the root element is an element and is in the DOM.
     * @return {boolean} True if the root element is an element and is in the DOM.
     * @private
     */
    IntersectionObserver.prototype._rootIsInDom = function() {
      return !this.root || containsDeep(document, this.root);
    };


    /**
     * Returns whether or not the target element is a child of root.
     * @param {Element} target The target element to check.
     * @return {boolean} True if the target element is a child of root.
     * @private
     */
    IntersectionObserver.prototype._rootContainsTarget = function(target) {
      var rootDoc =
        (this.root && (this.root.ownerDocument || this.root)) || document;
      return (
        containsDeep(rootDoc, target) &&
        (!this.root || rootDoc == target.ownerDocument)
      );
    };


    /**
     * Adds the instance to the global IntersectionObserver registry if it isn't
     * already present.
     * @private
     */
    IntersectionObserver.prototype._registerInstance = function() {
      if (registry.indexOf(this) < 0) {
        registry.push(this);
      }
    };


    /**
     * Removes the instance from the global IntersectionObserver registry.
     * @private
     */
    IntersectionObserver.prototype._unregisterInstance = function() {
      var index = registry.indexOf(this);
      if (index != -1) registry.splice(index, 1);
    };


    /**
     * Returns the result of the performance.now() method or null in browsers
     * that don't support the API.
     * @return {number} The elapsed time since the page was requested.
     */
    function now() {
      return window.performance && performance.now && performance.now();
    }


    /**
     * Throttles a function and delays its execution, so it's only called at most
     * once within a given time period.
     * @param {Function} fn The function to throttle.
     * @param {number} timeout The amount of time that must pass before the
     *     function can be called again.
     * @return {Function} The throttled function.
     */
    function throttle(fn, timeout) {
      var timer = null;
      return function () {
        if (!timer) {
          timer = setTimeout(function() {
            fn();
            timer = null;
          }, timeout);
        }
      };
    }


    /**
     * Adds an event handler to a DOM node ensuring cross-browser compatibility.
     * @param {Node} node The DOM node to add the event handler to.
     * @param {string} event The event name.
     * @param {Function} fn The event handler to add.
     * @param {boolean} opt_useCapture Optionally adds the even to the capture
     *     phase. Note: this only works in modern browsers.
     */
    function addEvent(node, event, fn, opt_useCapture) {
      if (typeof node.addEventListener == 'function') {
        node.addEventListener(event, fn, opt_useCapture || false);
      }
      else if (typeof node.attachEvent == 'function') {
        node.attachEvent('on' + event, fn);
      }
    }


    /**
     * Removes a previously added event handler from a DOM node.
     * @param {Node} node The DOM node to remove the event handler from.
     * @param {string} event The event name.
     * @param {Function} fn The event handler to remove.
     * @param {boolean} opt_useCapture If the event handler was added with this
     *     flag set to true, it should be set to true here in order to remove it.
     */
    function removeEvent(node, event, fn, opt_useCapture) {
      if (typeof node.removeEventListener == 'function') {
        node.removeEventListener(event, fn, opt_useCapture || false);
      }
      else if (typeof node.detachEvent == 'function') {
        node.detachEvent('on' + event, fn);
      }
    }


    /**
     * Returns the intersection between two rect objects.
     * @param {Object} rect1 The first rect.
     * @param {Object} rect2 The second rect.
     * @return {?Object|?ClientRect} The intersection rect or undefined if no
     *     intersection is found.
     */
    function computeRectIntersection(rect1, rect2) {
      var top = Math.max(rect1.top, rect2.top);
      var bottom = Math.min(rect1.bottom, rect2.bottom);
      var left = Math.max(rect1.left, rect2.left);
      var right = Math.min(rect1.right, rect2.right);
      var width = right - left;
      var height = bottom - top;

      return (width >= 0 && height >= 0) && {
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        width: width,
        height: height
      } || null;
    }


    /**
     * Shims the native getBoundingClientRect for compatibility with older IE.
     * @param {Element} el The element whose bounding rect to get.
     * @return {DOMRect|ClientRect} The (possibly shimmed) rect of the element.
     */
    function getBoundingClientRect(el) {
      var rect;

      try {
        rect = el.getBoundingClientRect();
      } catch (err) {
        // Ignore Windows 7 IE11 "Unspecified error"
        // https://github.com/w3c/IntersectionObserver/pull/205
      }

      if (!rect) return getEmptyRect();

      // Older IE
      if (!(rect.width && rect.height)) {
        rect = {
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.right - rect.left,
          height: rect.bottom - rect.top
        };
      }
      return rect;
    }


    /**
     * Returns an empty rect object. An empty rect is returned when an element
     * is not in the DOM.
     * @return {ClientRect} The empty rect.
     */
    function getEmptyRect() {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0
      };
    }


    /**
     * Ensure that the result has all of the necessary fields of the DOMRect.
     * Specifically this ensures that `x` and `y` fields are set.
     *
     * @param {?DOMRect|?ClientRect} rect
     * @return {?DOMRect}
     */
    function ensureDOMRect(rect) {
      // A `DOMRect` object has `x` and `y` fields.
      if (!rect || 'x' in rect) {
        return rect;
      }
      // A IE's `ClientRect` type does not have `x` and `y`. The same is the case
      // for internally calculated Rect objects. For the purposes of
      // `IntersectionObserver`, it's sufficient to simply mirror `left` and `top`
      // for these fields.
      return {
        top: rect.top,
        y: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        x: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height
      };
    }


    /**
     * Inverts the intersection and bounding rect from the parent (frame) BCR to
     * the local BCR space.
     * @param {DOMRect|ClientRect} parentBoundingRect The parent's bound client rect.
     * @param {DOMRect|ClientRect} parentIntersectionRect The parent's own intersection rect.
     * @return {ClientRect} The local root bounding rect for the parent's children.
     */
    function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
      var top = parentIntersectionRect.top - parentBoundingRect.top;
      var left = parentIntersectionRect.left - parentBoundingRect.left;
      return {
        top: top,
        left: left,
        height: parentIntersectionRect.height,
        width: parentIntersectionRect.width,
        bottom: top + parentIntersectionRect.height,
        right: left + parentIntersectionRect.width
      };
    }


    /**
     * Checks to see if a parent element contains a child element (including inside
     * shadow DOM).
     * @param {Node} parent The parent element.
     * @param {Node} child The child element.
     * @return {boolean} True if the parent node contains the child node.
     */
    function containsDeep(parent, child) {
      var node = child;
      while (node) {
        if (node == parent) return true;

        node = getParentNode(node);
      }
      return false;
    }


    /**
     * Gets the parent node of an element or its host element if the parent node
     * is a shadow root.
     * @param {Node} node The node whose parent to get.
     * @return {Node|null} The parent node or null if no parent exists.
     */
    function getParentNode(node) {
      var parent = node.parentNode;

      if (node.nodeType == /* DOCUMENT */ 9 && node != document) {
        // If this node is a document node, look for the embedding frame.
        return getFrameElement(node);
      }

      // If the parent has element that is assigned through shadow root slot
      if (parent && parent.assignedSlot) {
        parent = parent.assignedSlot.parentNode;
      }

      if (parent && parent.nodeType == 11 && parent.host) {
        // If the parent is a shadow root, return the host element.
        return parent.host;
      }

      return parent;
    }

    /**
     * Returns true if `node` is a Document.
     * @param {!Node} node
     * @returns {boolean}
     */
    function isDoc(node) {
      return node && node.nodeType === 9;
    }


    // Exposes the constructors globally.
    window.IntersectionObserver = IntersectionObserver;
    window.IntersectionObserverEntry = IntersectionObserverEntry;

    }());

    /// <reference types="@adr/types/declaration" />
    /**
     * Класс Observer расширяет IntersectionObserver и предназначен для наблюдения за элементами на странице.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
     */
    class Observer extends window.IntersectionObserver {
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
         */
        constructor(callback, options) {
            super(callback, options);
            // safari в iOS 13 и меньше, игнорирует наследование некоторых классов, если посмотреть прототип,
            // то там будут добавлены методы, но у экземпляра этого класса, будут методы только класса от которого наследуемся.
            // чтобы обойти это, явно устанавливаем прототип 
            Object.setPrototypeOf(this, Observer.prototype);
        }
        /**
         * Набор целевых элементов, отслеживаемых IntersectionObserver.
         */
        elementsToObserve = [];
        /**
         * Проверяет, есть ли элемент в наборе целевых элементов, отслеживаемых IntersectionObserver.
         * @param target - элемент, который необходимо проверить.
         * @returns true, если элемент есть в наборе целевых элементов, отслеживаемых IntersectionObserver, иначе false.
         */
        isObserved(target) {
            if (!htmlElement(target))
                return false;
            for (const elem of this.elementsToObserve)
                if (elem === target)
                    return true;
            return false;
        }
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/disconnect
         */
        disconnect() {
            this.elementsToObserve.length = 0; // удаляем все элементы 
            super.disconnect();
        }
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe
         */
        observe(target) {
            super.observe(target);
            if (!this.isObserved(target))
                this.elementsToObserve.push(target);
        }
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve
         */
        unobserve(target) {
            if (!htmlElement(target))
                throw new Error("Target must be an html element");
            super.unobserve(target);
            const index = this.elementsToObserve.findIndex(elem => elem === target);
            if (index === -1)
                return;
            this.elementsToObserve[index] = this.elementsToObserve[this.elementsToObserve.length - 1];
            this.elementsToObserve.pop();
        }
    }

    /**
     * Время ожидания запроса.
     */
    const TIMEOUT = 10000;

    const imgStyles = {
        position: "absolute",
        display: "none",
        width: "0px",
        height: "0px"
    };
    /**
     * Предназначен для отправки запросов посредством вставки элемента img в DOM (пискелей).
     */
    class Pixel {
        /**
         * URL по которому необходимо отправить запрос.
         */
        url;
        /**
         * Элемент, в который будет вставлен img. По умолчанию - document.body.
         */
        element;
        /**
         * @param url - URL по которому необходимо отправить запрос.
         * @param element - элемент, в который будет вставлен img. По умолчанию - document.body.
         */
        constructor(url, element) {
            if (string(url) && isEmptyString(url))
                throw new Error("Pixel: url should not be an empty.");
            if (!string(url))
                throw new Error("Pixel: url must be a string.");
            this.url = url;
            if (element instanceof Document) {
                this.element = element.body;
            }
            else if (element instanceof HTMLElement) {
                this.element = element;
            }
            else {
                this.element = document.body;
            }
        }
        /**
         * Отправляет запрос. Реджектит промис, если запрос превышает время ожидания (10с).
         * @returns промис.
         */
        send() {
            return new Promise((resolve, reject) => {
                const img = document.createElement("img");
                setStyles(img, imgStyles);
                img.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
                img.setAttribute("src", this.url);
                const timeOutHandler = setTimeout(() => {
                    img.removeEventListener("load", imgEventHandler);
                    img.removeEventListener("error", imgEventHandler);
                    reject(new Error("Pixel: TimeOut error."));
                }, TIMEOUT);
                const imgEventHandler = (event) => {
                    clearTimeout(timeOutHandler);
                    if (event.type === "error") {
                        reject(new Error("Pixel: Img error loading."));
                    }
                    else {
                        resolve(event);
                    }
                };
                img.addEventListener("load", imgEventHandler);
                img.addEventListener("error", imgEventHandler);
                this.element.append(img);
            });
        }
    }

    const DEFAULT_DELAY = 1000;
    const DEFAULT_VISIBILITY_PERCENT = 0.5;
    const MAX_TIME_FIRST_SCREEN_VIEWABILITY = 1000;
    const ioOptions = {
        rootMargin: "0px",
        threshold: [0, 0.12, 0.25, 0.37, 0.5, 0.75, 1],
        trackVisibility: true,
        delay: 100
    };
    const BASIC_CUSTOMS_LIST = {
        zero: [113, 161, 162, 168, 176, 177, 213, 214, 216, 217, 218, 163, 165, 226],
        clientViewability: [161, 162, 176, 216, 217, 165, 226],
        firstScreenViewability: [161, 162, 176, 165],
        viewability: [115, 161, 162, 176, 216, 217, 165, 226],
        error: [113, 115, 161, 162, 163, 165, 168, 176, 177, 213, 214, 216, 217, 218, 226]
    };
    const IO_CUSTOMS_LIST = {
        zero: [...BASIC_CUSTOMS_LIST.zero, 227],
        clientViewability: [...BASIC_CUSTOMS_LIST.clientViewability, 227],
        firstScreenViewability: [...BASIC_CUSTOMS_LIST.firstScreenViewability, 227],
        viewability: [...BASIC_CUSTOMS_LIST.viewability, 227],
        error: [...BASIC_CUSTOMS_LIST.error]
    };
    const MRAID_CUSTOMS_LIST = {
        zero: [...BASIC_CUSTOMS_LIST.zero, 116, 117, 118, 119, 177],
        clientViewability: [...BASIC_CUSTOMS_LIST.clientViewability, 116, 117, 118, 119, 177],
        firstScreenViewability: [...BASIC_CUSTOMS_LIST.firstScreenViewability, 116, 117, 118, 119, 177],
        viewability: [...BASIC_CUSTOMS_LIST.viewability, 116, 117, 118, 119, 177],
        error: [...BASIC_CUSTOMS_LIST.error, 116, 117, 118, 119, 177]
    };
    const OMID_CUSTOMS_LIST = {
        zero: [...BASIC_CUSTOMS_LIST.zero],
        clientViewability: [...BASIC_CUSTOMS_LIST.clientViewability],
        firstScreenViewability: [...BASIC_CUSTOMS_LIST.firstScreenViewability],
        viewability: [...BASIC_CUSTOMS_LIST.viewability],
        error: [...BASIC_CUSTOMS_LIST.error]
    };
    const EVENTS = {
        zero: {
            name: "ZeroEvent",
            type: 0 + 110
        },
        clientViewability: {
            name: "ClientViewability",
            type: 69 + 110
        },
        firstScreenViewability: {
            name: "FirstScreenViewability",
            type: 27 + 110
        },
        viewability: {
            name: "Viewability",
            type: 53 + 110
        },
        error: {
            name: "Error",
            type: 26 + 110
        }
    };
    const METHOD_MRAID_V2 = 4;
    const METHOD_MRAID_V3 = 5;
    const OMID_METHOD = 6;

    class Viewability {
        informant;
        eventLink;
        startTime;
        sendZeroEvent;
        sendEvents;
        permanent;
        delay;
        visibilityInformant;
        nodeToTrack;
        secondaryParams;
        viewablePercent;
        firstStart;
        checkList;
        clientViewabilityTimeoutId;
        viewabilityTimeoutId;
        constructor({ eventLink, sendZeroEvent, permanent, sendEvents, nodeToTrack, delay, startTime, secondaryParams }) {
            if (typeof eventLink !== "string" || isEmptyString(eventLink))
                throw new Error("AV: missing event link");
            this.informant = new EventCollector();
            this.eventLink = eventLink;
            this.nodeToTrack = nodeToTrack;
            this.sendZeroEvent = typeof sendZeroEvent === "boolean" ? sendZeroEvent : true;
            this.permanent = typeof permanent === "boolean" ? permanent : true;
            this.sendEvents = typeof sendEvents === "boolean" ? sendEvents : true;
            this.delay = number(delay) ? delay : DEFAULT_DELAY;
            this.startTime = number(startTime) ? startTime : new Date().getTime();
            this.secondaryParams = (secondaryParams && number(secondaryParams.time) && number(secondaryParams.area)) ? secondaryParams : null;
            this.viewablePercent = -1;
            this.firstStart = true;
            this.visibilityInformant = new EventCollector();
            this.checkList = {
                client: isTruthy(this.secondaryParams),
                native: true,
                firstScreen: true
            };
        }
        sendEvent({ name, type }, sendPixel, customList) {
            this.informant.triggerEvent(name);
            if (sendPixel) {
                const custom = this.cc.clear()
                    .collect(customList || [])
                    .toString();
                const url = new URI(this.eventLink)
                    .setRnd()
                    .setParams({ type, custom })
                    .toString();
                new Pixel(url).send();
            }
        }
        checkViewability() {
            this.cc.collectFrom(this);
            delay().then(() => // задержка потому что событие отправляется раньше чем на него подписались
             this.sendEvent(EVENTS.zero, this.sendZeroEvent, this.customLists.zero));
            this.visibilityInformant.subscribe(EVENTS.firstScreenViewability.name, () => this.sendEvent(EVENTS.firstScreenViewability, this.sendEvents, this.customLists.firstScreenViewability));
            this.visibilityInformant.subscribe(EVENTS.viewability.name, () => {
                this.sendEvent(EVENTS.viewability, this.sendEvents, this.customLists.viewability);
                this.visibilityInformant.unsubscribe(EVENTS.viewability.name);
                if (this.permanent)
                    this.visibilityInformant.subscribe(EVENTS.viewability.name, () => this.sendEvent(EVENTS.viewability, false));
            });
            this.visibilityInformant.subscribe(EVENTS.clientViewability.name, () => {
                this.sendEvent(EVENTS.clientViewability, this.sendEvents, this.customLists.clientViewability);
                this.visibilityInformant.unsubscribe(EVENTS.clientViewability.name);
                if (this.permanent)
                    this.visibilityInformant.subscribe(EVENTS.clientViewability.name, () => this.sendEvent(EVENTS.clientViewability, false));
            });
            this.visibilityInformant.subscribe(EVENTS.error.name, () => {
                this.sendEvent(EVENTS.error, this.sendZeroEvent || this.sendEvents, this.customLists.error);
                this.remove();
            });
            this.init();
        }
        viewabilityChange(viewablePercent) {
            this.viewablePercent = viewablePercent;
            if (this.checkList.client)
                this.checkClientViewability();
            if (this.checkList.native)
                this.checkNativeViewability();
            if (this.checkList.firstScreen)
                this.checkFirstScreenViewability();
            if ( // отправили все события
            !this.permanent &&
                !this.checkList.client &&
                !this.checkList.native &&
                !this.checkList.firstScreen) {
                this.visibilityInformant.clear();
            }
        }
        checkClientViewability() {
            if (this.viewablePercent >= +this.secondaryParams.area / 100) {
                if (!this.clientViewabilityTimeoutId)
                    this.clientViewabilityTimeoutId = setTimeout(() => {
                        this.visibilityInformant.triggerEvent(EVENTS.clientViewability.name);
                        if (!this.permanent)
                            this.checkList.client = false;
                    }, +this.secondaryParams.time);
            }
            else if (this.clientViewabilityTimeoutId) {
                clearTimeout(this.clientViewabilityTimeoutId);
                this.clientViewabilityTimeoutId = null;
            }
        }
        checkNativeViewability() {
            if (this.viewablePercent >= DEFAULT_VISIBILITY_PERCENT) {
                if (!this.viewabilityTimeoutId)
                    this.viewabilityTimeoutId = setTimeout(() => {
                        this.visibilityInformant.triggerEvent(EVENTS.viewability.name);
                        if (!this.permanent)
                            this.checkList.native = false;
                    }, this.delay);
            }
            else if (this.viewabilityTimeoutId) {
                clearTimeout(this.viewabilityTimeoutId);
                this.viewabilityTimeoutId = null;
            }
        }
        checkFirstScreenViewability() {
            if (new Date().getTime() - this.startTime <= MAX_TIME_FIRST_SCREEN_VIEWABILITY) {
                if (this.viewablePercent >= DEFAULT_VISIBILITY_PERCENT)
                    this.visibilityInformant.triggerEvent(EVENTS.firstScreenViewability.name);
                else
                    return;
            }
            this.checkList.firstScreen = false;
        }
        // client api
        getViewablePercent() {
            return this.viewablePercent;
        }
        subscribe(eventName, fn, context) {
            this.informant.subscribe(eventName, fn?.bind?.(context));
        }
        unsubscribe(eventName) {
            this.informant.unsubscribe(eventName);
        }
        remove() {
            this.informant.clear();
            this.visibilityInformant.clear();
            this.viewablePercent = -1;
        }
    }

    /// <reference types="@adr/types/declaration" />
    class IOViewability extends Viewability {
        width;
        height;
        cc;
        measurable;
        methodOfDeterminingVisibility;
        observer;
        customLists;
        absoluteVisible;
        constructor(config) {
            super(config);
            this.observer = new Observer(this.observerHandler.bind(this), ioOptions);
            this.methodOfDeterminingVisibility = 1;
            this.width = this.nodeToTrack.clientWidth;
            this.height = this.nodeToTrack.clientHeight;
            this.cc = new CustomCollector();
            this.customLists = IO_CUSTOMS_LIST;
            this.measurable = true;
            this.absoluteVisible = null;
        }
        get isFullscreenMode() {
            return checkMode(this.nodeToTrack, this.nodeToTrack.ownerDocument);
        }
        init() {
            this.observer.observe(this.nodeToTrack);
        }
        observerHandler([entry]) {
            const { intersectionRatio, isVisible } = entry;
            this.viewabilityChange(intersectionRatio);
            this.absoluteVisible = isVisible ?? null;
        }
        remove() {
            super.remove();
            this.observer.disconnect();
        }
    }

    /**
     * Класс MRAIDViewability расширяет класс {@link Viewability} и обеспечивает отслеживание видимости.
     */
    class MRAIDViewability extends Viewability {
        /**
         * Способ определения видимости.
         */
        methodOfDeterminingVisibility;
        /**
         * Экземпляр CustomCollector для сбора кастомов.
         */
        cc;
        /**
         * Объект, где ключ - имя события, значение - массив номеров кастомов для этого события.
         */
        customLists;
        /**
         * Флаг указывающий, является ли рекламный контейнер измеряемым.
         */
        measurable;
        /**
         * Флаг указыващий, находится ли реклама в полноэкранном режиме.
         *
         * @defaultValue Если значение не известно, то присваивается null
         */
        isFullscreenMode;
        /**
         * Версия спецификации MRAID, полученная из объекта window.mraid
         */
        version;
        /**
         * Имя SDK.
         *
         * @defaultValue Если доступено значение sdk, то присваивается это значение, в противном случае - значение 0.
         */
        sdk;
        /**
         * Версии SDK.
         *
         * @defaultValue Если доступено значение sdkVersion, то присваивается это значение, в противном случае - значение 0.
         */
        sdkVersion;
        /**
         * Имя пакета или идентификатор приложения.
         *
         * @defaultValue Если доступено значение appId, то присваивается это значение, в противном случае - значение 0.
         */
        appId;
        /**
         * Идентификатор пользователя для рекламных целей.
         *
         * @remarks
         * Для iOS, это должен быть идентификатор для рекламы (IDFA).
         * Для Android это должен быть идентификатор рекламы Google (AID).
         *
         * @defaultValue Если доступено значение ifa, то присваивается это значение, в противном случае - значение 0.
         */
        ifa;
        /**
         * Флаг указывающий, отписан ли рекламный контейнер от событий
         */
        removed;
        /**
         * Конструктор класса MRAIDViewability
         *
         * @param config - объект, содержащий конфигурацию для измерения видимости.
         */
        constructor(config) {
            super(config);
            this.cc = new CustomCollector();
            this.version = window.mraid.getVersion();
            this.methodOfDeterminingVisibility = this.version === "2.0" ? METHOD_MRAID_V2 : METHOD_MRAID_V3;
            this.customLists = MRAID_CUSTOMS_LIST;
            this.measurable = true;
            this.sdk = window?.MRAID_ENV?.sdk ?? "0";
            this.sdkVersion = window?.MRAID_ENV?.sdkVersion ?? "0";
            this.appId = window?.MRAID_ENV?.appId ?? "0";
            this.ifa = window?.MRAID_ENV?.ifa ?? "0";
            this.removed = false;
            this.isFullscreenMode = null;
        }
        /**
         * @returns Возвращает ширину рекламного контейнера, округленная до ближайшего целого числа.
         */
        get width() {
            return Math.round(window.mraid.getSize().width);
        }
        /**
         * @returns Возвращает высоту рекламного контейнера, округленная до ближайшего целого числа.
         */
        get height() {
            return Math.round(window.mraid.getSize().height);
        }
        /**
         * Обрабатывает изменения состояния и определяет находится ли рекламный контейнер в полноэкранном режиме или нет.
         *
         * @param state - Новое состояние рекламного контейнера.
         *
         * @remarks
         * Возможные состояния:
         * * `"default"`: Рекламный контейнер находится в состоянии по умолчанию.
         * * `"expanded"`: Рекламный контейнер находится в развернутом состоянии (полноэкранный режим).
         * * `"resized"`: Размер рекламного контейнера изменен.
         * * `"hidden"`: Рекламный контейнер скрыт.
         */
        handleStateChange(state) {
            this.isFullscreenMode = !this.removed ? state === "expanded" : null;
        }
        /**
         * Регистрирует слушателей событий.
         *
         * @remarks
         * Если состояние MRAID равно "loading", метод ждет события "ready" перед продолжением выполнения.
         * В противном случае, он немедленно регистрирует слушателя события "stateChange".
         * Если версия MRAID равна "3.0", регистрируется слушатель события "exposureChange" для обработки изменений видимости.
         * Для версий отличных от "3.0", проверяется начальное состояние видимости и регистрируется слушатель события "viewableChange"
         */
        init() {
            if (window.mraid.getState() === "loading")
                return window.mraid.addEventListener("ready", this.init.bind(this));
            window.mraid.addEventListener("stateChange", this.handleStateChange.bind(this));
            if (this.version === "3.0")
                window.mraid.addEventListener("exposureChange", (viewablePercent) => this.mraidEventHandler(viewablePercent / 100));
            else {
                if (window.mraid.isViewable())
                    this.mraidEventHandler(1);
                window.mraid.addEventListener("viewableChange", (viewable) => this.mraidEventHandler(viewable ? 1 : 0));
            }
        }
        /**
         * Обрабатывает событие MRAID и запускает изменение видимости.
         *
         * @param viewablePercent - Процент видимости для рекламного контейнера.
         */
        mraidEventHandler(viewablePercent) {
            if (this.removed)
                return;
            this.viewabilityChange(viewablePercent);
        }
        /**
         * Вызов базового метода "remove()" из родительского класса
         * Устанавливает флаг removed в значение true.
         */
        remove() {
            super.remove();
            this.removed = true;
        }
    }

    /**
     * Класс OMIDViewability расширяет класс {@link Viewability} измеряет и обрабатывает видимость объектов в
     * рекламных блоках с использованием OMID.
     */
    class OMIDViewability extends Viewability {
        /**
         * Ширина рекламного контейнера.
         */
        _width;
        /**
         * Высота рекламного контейнера.
         */
        _height;
        /**
         * Флаг, указывающий находится ли рекламный контейнер в полноэкранном режиме.
         * @defaultValue null - состояние неизвестно, true - в полноэкранном режиме, false - нет.
         */
        isFullscreenMode;
        /**
         * Объект, где ключ - имя события, значение - массив номеров кастомов для этого события.
         */
        customLists;
        /**
         * Экземпляр CustomCollector для сбора кастомов.
         */
        cc;
        /**
         * Флаг, указывающий возможность измерить viewability.
         */
        measurable;
        /**
         * Способ определения видимости.
         */
        methodOfDeterminingVisibility;
        /**
         * Экземпляр класса VerificationClient для подписки на события рекламы.
         */
        omidClient; // потом заменить на норм тип
        /**
         * Флаг указывающий, отписан ли рекламный контейнер от событий.
         */
        removed;
        /**
         * @param config - объект, содержащий конфигурацию для измерения видимости.
         */
        constructor(config) {
            super(config);
            this.omidClient = new window.VerificationClient();
            this.cc = new CustomCollector();
            this.customLists = OMID_CUSTOMS_LIST;
            this.measurable = true;
            this._width = -1;
            this._height = -1;
            this.methodOfDeterminingVisibility = OMID_METHOD;
            this.removed = false;
            this.isFullscreenMode = null;
        }
        /**
         * Обрабатывает событие для обнаружения полноэкранного состояния.
         *
         * @param event - объект события, содержащий данные, включая связанные с полноэкранным состоянием.
         * @remarks
         * Возможные состояния:
         * * `"minimized"`:  Плеер находится в свернутом состоянии.
         * * `"collapsed"`: Размеры плеера уменьшены по сравнению с состоянием по умолчанию.
         * * `"normal"`: Размер плеера соответствует состоянию по умолчанию.
         * * `"expanded"`: Размеры плеера увеличены по сравнению с состоянием по умолчанию.
         * * `"fullscreen"`: Плеер находится в полноэкранном режиме.
         */
        playerStateChangeHandler(event) {
            this.isFullscreenMode = !this.removed && event?.data ? event.data.state === "fullscreen" : null;
        }
        /**
         * @returns возвращает ширину рекламного контейнера.
         */
        get width() {
            return this._width;
        }
        /**
         * @returns возвращает высоту рекламного контейнера.
         */
        get height() {
            return this._height;
        }
        /**
         * Флаг, указывающий наличие поддержки OMID-совместимой среды.
         * @returns true или false
         */
        isSupported() {
            return this.omidClient.isSupported();
        }
        /**
         * Инициализирует функциональность, регистрируя слушателей событий OMID.
         */
        init() {
            this.omidClient.addEventListener("geometryChange", this.omidEventHandler.bind(this));
            this.omidClient.addEventListener("playerStateChange", this.playerStateChangeHandler.bind(this));
        }
        /**
         * Обработчик события OMID.
         * Извлекает данные о проценте отображения рекламы во Viewability и вызывает метод viewabilityChange().
         * Также обновляет ширину и высоту геометрии рекламного контейнера.
         *
         * @param event - объект события OMID.
         */
        omidEventHandler(event) {
            if (this.removed)
                return;
            const percentageInView = (event?.data?.adView?.percentageInView ?? 0) / 100;
            if (number(percentageInView))
                this.viewabilityChange(percentageInView);
            this._width = event?.data?.adView.geometry.width ?? this._width;
            this._height = event?.data?.adView.geometry.height ?? this._height;
        }
        /**
         * Устанавливает ключ removed в true.
         */
        remove() {
            super.remove();
            this.removed = true;
        }
    }

    class AdriverViewability {
        viewabilityDeterminant;
        config;
        constructor(config) {
            if (!strictObject(config) || isEmptyObject(config))
                throw new Error("AdriverViewability: there is no confing.");
            this.config = { ...config };
            if (!htmlElement(this.config.nodeToTrack)) {
                if (typeof this.config.nodeToTrack !== "string" || isEmptyString(this.config.nodeToTrack))
                    throw new Error("AdriverViewability: the element or its id is missing.");
                const element = document.querySelector(htmlId(this.config.nodeToTrack));
                if (!element)
                    throw new Error("AdriverViewability: the element could not be found.");
                this.config.nodeToTrack = element;
            }
            const isMobilePlatform = mobile();
            select_visibility_determinant: {
                if (isMobilePlatform && window.mraid) {
                    const mraidVersion = window.mraid.getVersion();
                    if (mraidVersion === "2.0" || mraidVersion === "3.0") {
                        this.viewabilityDeterminant = new MRAIDViewability(this.config);
                        break select_visibility_determinant;
                    }
                }
                if (isMobilePlatform && window.VerificationClient) {
                    const OMIDViewabilityInstance = new OMIDViewability(this.config);
                    if (OMIDViewabilityInstance.isSupported()) {
                        this.viewabilityDeterminant = OMIDViewabilityInstance;
                        break select_visibility_determinant;
                    }
                }
                this.viewabilityDeterminant = new IOViewability(this.config);
            }
            this.viewabilityDeterminant.checkViewability();
        }
        // client api
        getViewablePercent() {
            return this.viewabilityDeterminant.getViewablePercent();
        }
        subscribe(eventName, fn, context) {
            this.viewabilityDeterminant.subscribe(eventName, fn, context);
        }
        unsubscribe(eventName) {
            this.viewabilityDeterminant.unsubscribe(eventName);
        }
        remove() {
            this.viewabilityDeterminant.remove();
        }
    }

    document.getElementsByClassName("hidden-iframe")[0];
    new AdriverViewability({
        eventLink: "https://e.ru",
        nodeToTrack: document.body,
        sendZeroEvent: true,
        permanent: true,
        sendEvents: true
    });

})();
//# sourceMappingURL=index.js.map
