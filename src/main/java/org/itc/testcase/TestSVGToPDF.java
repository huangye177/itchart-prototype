package org.itc.testcase;

import java.io.File;

import org.itc.util.SvgUtil;

public class TestSVGToPDF {
	public static void main(String[] args) throws Exception {  
		
		String currentPath = System.getProperty("user.dir");
        File f=new File(currentPath + "/src/main/java/org/itc/testcase/Example.svg");  
        File destFile=new File(currentPath + "/src/main/java/org/itc/testcase/Example.pdf");  
        SvgUtil.convertSvgFile2Pdf(f, destFile);  
    }  
}
