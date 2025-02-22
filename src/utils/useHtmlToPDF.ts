// 引入 html2canvas.js

// 引入 jspdf.umd.js

import html2Canvas from 'html2canvas';
import JsPDF from 'jspdf';

 
/**
 * html转pdf
 * @param  elementId 需要输出PDF的页面id
 * @param successCallback 函数成功回调
 * @param errorCallback 函数失败回调
 * @returns {Object}
 *      pdf {Object} - 返回选定PDFjs类
 *      canvas { Object} - 返回canvas 类
 *      canvasUrl {String} - 返回可预览的base64
 */
 
/**
 * PDF 下载
 * pdf.save(`报名表${this.htmlFormatDate(new Date())}`)
 */
export default function exportHtmlPDF(elementId:string, successCallback:Function,errorCallback:Function){
    /**
     * 是否是函数
     * @returns {Boolean}
     */
     function htmlIsFunction(fun:any) {
        if (Object.prototype.toString.call(fun) === "[object Function]") {
            return true
        } else {
            return false
        }
    }

    const element = document.getElementById(elementId);
      if (!element) {
    throw new Error(`Element with id "${elementId}" not found.`);
  }
    const originalHeight = element?.style.height; // 保存原始高度
    const originalOverflow = element?.style.overflow; // 保存原始overflow属性

    // 临时调整高度和overflow属性以捕获整个内容
    (element as HTMLElement).style.height = 'auto';
    (element as HTMLElement).style.overflow = 'visible';

    html2Canvas((element as HTMLElement) , {
        scale: 1,
        backgroundColor: '#ffffff',
        allowTaint: true,
        useCORS: true,
        scrollY: 0,
        scrollX: 0,
        windowHeight: element?.scrollHeight // 设置窗口高度为元素的总高度
    }).then((canvas) => {
        const pdf = new JsPDF("p", "mm", "a4"); // A4纸，纵向
        const ctx = canvas.getContext("2d");
        const a4w = 190;
        const a4h = 257; // A4大小，210mm x 297mm，四边各保留20mm的边距
        const imgHeight = Math.floor(a4h * canvas.width / a4w); // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0;
        let pageNumber = 1;//当前页码

           // 添加页头 Logo
          const logoImg = new Image();
        logoImg.src = 'https://tse3-mm.cn.bing.net/th/id/OIP-C.Hy2orbb7myTCkgKVd7FRWwHaHa?rs=1&pid=ImgDetMain';
        logoImg.onload = () => {
             while (renderedHeight < canvas.height) {
            const page = document.createElement("canvas");
            page.width = canvas.width;
            page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页

            // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
            page.getContext("2d")?.putImageData((ctx as CanvasRenderingContext2D).getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0);

          
          // 添加页头 Logo
          pdf.addImage(logoImg, 'PNG', 10, 5, 10, 10); // 在 (10mm, 10mm) 位置插入 Logo
        
            //添加内容
            pdf.addImage(page.toDataURL("image/jpeg", 1.0), "JPEG", 10, 20, a4w, Math.min(a4h, a4w * page.height / page.width)); // 添加图像到页面，保留10mm边距

         // 添加页尾页码
        pdf.setFontSize(10);
        pdf.text(`${pageNumber}`, a4w / 2 + 5, 285, { align: 'center' }); // 在页面底部居中显示页码

            renderedHeight += imgHeight;
                 if (renderedHeight < canvas.height) { pdf.addPage(); pageNumber += 1; } // 如果后面还有内容，添加一个空页
        }

        // 恢复原始高度和overflow属性
        (element as HTMLElement).style.height = originalHeight as string;
        (element as HTMLElement).style.overflow = originalOverflow as string;

        if (successCallback && htmlIsFunction(successCallback)) {
            successCallback({ pdf, canvas, canvasUrl: canvas.toDataURL("image/png") });
        }
        };
        
        logoImg.onerror = () => {
        console.error('Logo 图片加载失败');
      };

       
    }).catch((error) => {
        // 恢复原始高度和overflow属性
        (element as HTMLElement).style.height = originalHeight as string;
        (element as HTMLElement).style.overflow = originalOverflow as string;

        if (errorCallback && htmlIsFunction(errorCallback)) {
            errorCallback(error);
        }
    });
}
