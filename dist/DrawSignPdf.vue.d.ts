import { PDFPageProxy, GetViewportParameters, GetAnnotationsParameters, RenderParameters, RenderTask, GetOperatorListParameters, PDFOperatorList, getTextContentParameters, TextContent, StructTreeNode } from 'pdfjs-dist/types/src/display/api';
import { DrawingPayload, PdfSignatureData, TouchEventDetails, TouchMoveData } from './utils/pdfTypes';
import { DefineComponent, ExtractPropTypes, ComputedRef, Ref, ComponentOptionsMixin, PublicProps, ComponentProvideOptions, FunctionalComponent, HTMLAttributes, VNodeProps } from 'vue';
import { PageViewport } from 'pdfjs-dist/types/src/display/display_utils';
declare const _default: DefineComponent<ExtractPropTypes<{
    pdfData: StringConstructor;
    signatureData: () => PdfSignatureData[];
    isDownload: {
        type: BooleanConstructor;
        default: boolean;
    };
    finish: FunctionConstructor;
    translations: {
        type: ObjectConstructor;
        default: () => {};
    };
    enableZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, {
    getTranslation: ComputedRef<{
        updateSign: string;
        save: string;
        saving: string;
        drawLabel: string;
        drawDone: string;
        drawCancel: string;
        confirmBoxTitle: string;
        confirmBoxDesc: string;
        confirmBoxClose: string;
        confirmBoxSaveChanges: string;
        warningTitle: string;
        warningDesc: string;
        warningClose: string;
        pdfLoading: string;
        additionalTextField: string;
    }>;
    genID: () => number;
    pdfFile: Ref<{
        readonly lastModified: number;
        readonly name: string;
        readonly webkitRelativePath: string;
        readonly size: number;
        readonly type: string;
        arrayBuffer: () => Promise<ArrayBuffer>;
        bytes: () => Promise<Uint8Array>;
        slice: (start?: number, end?: number, contentType?: string) => Blob;
        stream: () => ReadableStream<Uint8Array>;
        text: () => Promise<string>;
    } | null, File | {
        readonly lastModified: number;
        readonly name: string;
        readonly webkitRelativePath: string;
        readonly size: number;
        readonly type: string;
        arrayBuffer: () => Promise<ArrayBuffer>;
        bytes: () => Promise<Uint8Array>;
        slice: (start?: number, end?: number, contentType?: string) => Blob;
        stream: () => ReadableStream<Uint8Array>;
        text: () => Promise<string>;
    } | null>;
    pdfName: Ref<string, string>;
    pages: Ref<{
        _pageIndex: any;
        _pageInfo: any;
        _ownerDocument: any;
        _transport: any;
        _stats: {
            started: any;
            times: any[];
            time: (name: any) => void;
            timeEnd: (name: any) => void;
            toString: () => string;
        } | null;
        _pdfBug: boolean;
        commonObjs: {
            get: (objId: string, callback?: Function | undefined) => any;
            has: (objId: string) => boolean;
            resolve: (objId: string, data?: any) => void;
            clear: () => void;
        };
        objs: {
            get: (objId: string, callback?: Function | undefined) => any;
            has: (objId: string) => boolean;
            resolve: (objId: string, data?: any) => void;
            clear: () => void;
        };
        _bitmaps: Set<any> & Omit<Set<any>, keyof Set<any>>;
        cleanupAfterRender: boolean;
        pendingCleanup: boolean;
        _intentStates: Map<any, any> & Omit<Map<any, any>, keyof Map<any, any>>;
        _annotationPromises: Map<any, any> & Omit<Map<any, any>, keyof Map<any, any>>;
        destroyed: boolean;
        readonly pageNumber: number;
        readonly rotate: number;
        readonly ref: {
            num: number;
            gen: number;
        } | null;
        readonly userUnit: number;
        readonly view: number[];
        getViewport: ({ scale, rotation, offsetX, offsetY, dontFlip, }?: GetViewportParameters) => PageViewport;
        getAnnotations: ({ intent }?: GetAnnotationsParameters) => Promise<Array<any>>;
        getJSActions: () => Promise<Object>;
        getXfa: () => Promise<Object | null>;
        render: ({ canvasContext, viewport, intent, annotationMode, transform, imageLayer, canvasFactory, background, optionalContentConfigPromise, annotationCanvasMap, pageColors, printAnnotationStorage, }: RenderParameters, ...args: any[]) => RenderTask;
        getOperatorList: ({ intent, annotationMode, printAnnotationStorage, }?: GetOperatorListParameters) => Promise< PDFOperatorList>;
        streamTextContent: ({ disableCombineTextItems, includeMarkedContent, }?: getTextContentParameters) => ReadableStream;
        getTextContent: (params?: getTextContentParameters) => Promise< TextContent>;
        getStructTree: () => Promise< StructTreeNode>;
        _jsActionsPromise: any;
        _structTreePromise: any;
        cleanup: (resetStats?: boolean | undefined) => boolean;
        readonly stats: Object;
    }[], PDFPageProxy[] | {
        _pageIndex: any;
        _pageInfo: any;
        _ownerDocument: any;
        _transport: any;
        _stats: {
            started: any;
            times: any[];
            time: (name: any) => void;
            timeEnd: (name: any) => void;
            toString: () => string;
        } | null;
        _pdfBug: boolean;
        commonObjs: {
            get: (objId: string, callback?: Function | undefined) => any;
            has: (objId: string) => boolean;
            resolve: (objId: string, data?: any) => void;
            clear: () => void;
        };
        objs: {
            get: (objId: string, callback?: Function | undefined) => any;
            has: (objId: string) => boolean;
            resolve: (objId: string, data?: any) => void;
            clear: () => void;
        };
        _bitmaps: Set<any> & Omit<Set<any>, keyof Set<any>>;
        cleanupAfterRender: boolean;
        pendingCleanup: boolean;
        _intentStates: Map<any, any> & Omit<Map<any, any>, keyof Map<any, any>>;
        _annotationPromises: Map<any, any> & Omit<Map<any, any>, keyof Map<any, any>>;
        destroyed: boolean;
        readonly pageNumber: number;
        readonly rotate: number;
        readonly ref: {
            num: number;
            gen: number;
        } | null;
        readonly userUnit: number;
        readonly view: number[];
        getViewport: ({ scale, rotation, offsetX, offsetY, dontFlip, }?: GetViewportParameters) => PageViewport;
        getAnnotations: ({ intent }?: GetAnnotationsParameters) => Promise<Array<any>>;
        getJSActions: () => Promise<Object>;
        getXfa: () => Promise<Object | null>;
        render: ({ canvasContext, viewport, intent, annotationMode, transform, imageLayer, canvasFactory, background, optionalContentConfigPromise, annotationCanvasMap, pageColors, printAnnotationStorage, }: RenderParameters, ...args: any[]) => RenderTask;
        getOperatorList: ({ intent, annotationMode, printAnnotationStorage, }?: GetOperatorListParameters) => Promise< PDFOperatorList>;
        streamTextContent: ({ disableCombineTextItems, includeMarkedContent, }?: getTextContentParameters) => ReadableStream;
        getTextContent: (params?: getTextContentParameters) => Promise< TextContent>;
        getStructTree: () => Promise< StructTreeNode>;
        _jsActionsPromise: any;
        _structTreePromise: any;
        cleanup: (resetStats?: boolean | undefined) => boolean;
        readonly stats: Object;
    }[]>;
    pagesScale: Ref<any[], any[]>;
    allObjects: Ref<any[], any[]>;
    currentFont: Ref<string, string>;
    focusId: Ref<null, null>;
    selectedPageIndex: Ref<number, number>;
    saving: Ref<boolean, boolean>;
    addingDrawing: Ref<boolean, boolean>;
    isOpenConfirm: Ref<boolean, boolean>;
    onUploadPDF: (e: any) => Promise<void>;
    addPDF: (pdfData: string, type: string) => Promise<void>;
    onAddDrawing: () => void;
    addDrawing: (originWidth: number, originHeight: number, path: string) => void;
    selectPage: (index: number) => void;
    updateObject: (objectId: number, payload: DrawingPayload) => void;
    onMeasure: (scale: number, i: number) => void;
    savePDF: () => Promise<void>;
    onFinishDrawing: (e: any) => Promise<void>;
    openModal: () => void;
    closeModal: () => void;
    confirmSave: () => void;
    isConfirmOrWarning: Ref<"warning" | "confirm", "warning" | "confirm">;
    zoomScale: Ref<number, number>;
    zoomPDF: (direction: "in" | "out") => void;
    pageRenderStatus: Ref<boolean[], boolean[]>;
    renderFinished: (index: number) => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("finish" | "onPDFRendered")[], "finish" | "onPDFRendered", PublicProps, Readonly< ExtractPropTypes<{
    pdfData: StringConstructor;
    signatureData: () => PdfSignatureData[];
    isDownload: {
        type: BooleanConstructor;
        default: boolean;
    };
    finish: FunctionConstructor;
    translations: {
        type: ObjectConstructor;
        default: () => {};
    };
    enableZoom: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onFinish?: ((...args: any[]) => any) | undefined;
    onOnPDFRendered?: ((...args: any[]) => any) | undefined;
}>, {
    translations: Record<string, any>;
    isDownload: boolean;
    enableZoom: boolean;
}, {}, {
    PDFPage: DefineComponent<{
        readonly [x: string]: /*elided*/ any;
    }, {
        canvas: Ref<HTMLCanvasElement | null, HTMLCanvasElement | null>;
        width: Ref<number, number>;
        height: Ref<number, number>;
    }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<{
        readonly [x: string]: /*elided*/ any;
    }> & Readonly<{}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
    DrawingCanvas: DefineComponent<ExtractPropTypes<{
        translations: {
            type: () => Record<string, string>;
            default: () => {};
        };
    }>, {
        getTranslation: ComputedRef<{
            drawLabel: string;
            drawDone: string;
            drawCancel: string;
            additionalTextField: string;
        }>;
        signatureCanvas: Ref<HTMLDivElement | null, HTMLDivElement | null>;
        path: Ref<string, string>;
        finish: () => void;
        cancel: () => void;
        handlePanStart: (event: TouchEventDetails) => void;
        handlePanMove: (event: TouchMoveData) => void;
        handlePanEnd: () => void;
    }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("cancel" | "finish")[], "cancel" | "finish", PublicProps, Readonly< ExtractPropTypes<{
        translations: {
            type: () => Record<string, string>;
            default: () => {};
        };
    }>> & Readonly<{
        onCancel?: ((...args: any[]) => any) | undefined;
        onFinish?: ((...args: any[]) => any) | undefined;
    }>, {
        translations: Record<string, string>;
    }, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
    DrawingSignature: DefineComponent<ExtractPropTypes<{
        originWidth: {
            type: NumberConstructor;
            required: true;
        };
        originHeight: {
            type: NumberConstructor;
            required: true;
        };
        width: {
            type: NumberConstructor;
            required: true;
        };
        height: {
            type: NumberConstructor;
            required: true;
        };
        x: {
            type: NumberConstructor;
            required: true;
        };
        y: {
            type: NumberConstructor;
            required: true;
        };
        pageScale: {
            type: NumberConstructor;
            default: number;
        };
        path: {
            type: StringConstructor;
            required: true;
        };
        zoomScale: {
            type: NumberConstructor;
            required: true;
        };
    }>, {
        dx: Ref<number, number>;
        dy: Ref<number, number>;
        dw: Ref<number, number>;
        direction: Ref<string, string>;
        operation: Ref<string, string>;
        startX: Ref<number, number>;
        startY: Ref<number, number>;
        svg: Ref<SVGSVGElement | null, SVGSVGElement | null>;
        ratio: number;
    }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "update"[], "update", PublicProps, Readonly< ExtractPropTypes<{
        originWidth: {
            type: NumberConstructor;
            required: true;
        };
        originHeight: {
            type: NumberConstructor;
            required: true;
        };
        width: {
            type: NumberConstructor;
            required: true;
        };
        height: {
            type: NumberConstructor;
            required: true;
        };
        x: {
            type: NumberConstructor;
            required: true;
        };
        y: {
            type: NumberConstructor;
            required: true;
        };
        pageScale: {
            type: NumberConstructor;
            default: number;
        };
        path: {
            type: StringConstructor;
            required: true;
        };
        zoomScale: {
            type: NumberConstructor;
            required: true;
        };
    }>> & Readonly<{
        onUpdate?: ((...args: any[]) => any) | undefined;
    }>, {
        pageScale: number;
    }, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
    DialogBox: DefineComponent<ExtractPropTypes<{
        translations: {
            type: () => Record<string, string>;
            default: () => {};
        };
        type: {
            type: () => "warning" | "confirm";
            default: string;
        };
    }>, {
        getTranslation: ComputedRef<{
            title: string;
            desc: string;
            close: string;
            saveChanges?: undefined;
        } | {
            title: string;
            desc: string;
            close: string;
            saveChanges: string;
        }>;
        closeModal: () => void;
        finish: () => void;
    }, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("cancel" | "finish")[], "cancel" | "finish", PublicProps, Readonly< ExtractPropTypes<{
        translations: {
            type: () => Record<string, string>;
            default: () => {};
        };
        type: {
            type: () => "warning" | "confirm";
            default: string;
        };
    }>> & Readonly<{
        onCancel?: ((...args: any[]) => any) | undefined;
        onFinish?: ((...args: any[]) => any) | undefined;
    }>, {
        type: "warning" | "confirm";
        translations: Record<string, string>;
    }, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
    MagnifyingGlassMinusIcon: FunctionalComponent< HTMLAttributes & VNodeProps, {}, any, {}>;
    MagnifyingGlassPlusIcon: FunctionalComponent< HTMLAttributes & VNodeProps, {}, any, {}>;
}, {}, string, ComponentProvideOptions, true, {}, any>;
export default _default;
