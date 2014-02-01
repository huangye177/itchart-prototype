package org.itc.util;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import org.apache.batik.transcoder.Transcoder;
import org.apache.batik.transcoder.TranscoderException;
import org.apache.batik.transcoder.TranscoderInput;
import org.apache.batik.transcoder.TranscoderOutput;
import org.apache.fop.svg.PDFTranscoder;
import org.apache.batik.transcoder.image.PNGTranscoder;

public class SvgUtil {
	
	/**
	 * SVG into PDF
	 * @param svg
	 * @param pdf
	 * @throws IOException
	 * @throws TranscoderException
	 */
	public static void convertSvgFile2Pdf(File svg, File pdf) throws IOException,TranscoderException 
	{
		InputStream in = new FileInputStream(svg);
		OutputStream out = new FileOutputStream(pdf);
		out = new BufferedOutputStream(out);
		convert2Pdf(in, out);
	}
	public static void convert2Pdf(InputStream in, OutputStream out)throws IOException, TranscoderException
	{
		Transcoder transcoder = new PDFTranscoder();
		try {
			TranscoderInput input = new TranscoderInput(in);
			try {
				TranscoderOutput output = new TranscoderOutput(out);
				transcoder.transcode(input, output);
			} finally {
				out.close();
			}
		} finally {
			in.close();
		}
	}
	/** 
	 * SVG into PNG
	 */
	public static void convertSvgFile2Png(File svg, File pdf) throws IOException,TranscoderException 
	{
		InputStream in = new FileInputStream(svg);
		OutputStream out = new FileOutputStream(pdf);
		out = new BufferedOutputStream(out);
		convert2PNG(in, out);
	}
	public static void convert2PNG(InputStream in, OutputStream out)throws IOException, TranscoderException
	{
		Transcoder transcoder = new PNGTranscoder();
		try {
			TranscoderInput input = new TranscoderInput(in);
			try {
				TranscoderOutput output = new TranscoderOutput(out);
				transcoder.transcode(input, output);
			} finally {
				out.close();
			}
		} finally {
			in.close();
		}
	}
	
	/**
	 * String into PDF 
	 * @param svg
	 * @param pdf
	 * @throws IOException
	 * @throws TranscoderException
	 */
	public static void convertStr2Pdf(String svg, File pdf) throws IOException,TranscoderException 
	{
		InputStream in = new ByteArrayInputStream(svg.getBytes());
		OutputStream out = new FileOutputStream(pdf);
		out = new BufferedOutputStream(out);
		convert2Pdf(in, out);
	}
}
