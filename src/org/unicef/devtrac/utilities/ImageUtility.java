package org.unicef.devtrac.utilities;

import java.io.InputStream;
import java.io.OutputStream;
import javax.microedition.io.Connector;
import javax.microedition.io.file.FileConnection;
import net.rim.device.api.math.Fixed32;
import net.rim.device.api.system.EncodedImage;

public class ImageUtility {

	public static String resizeImage(String path, int requiredWidth,
			int requiredHeight) {
		EncodedImage encodedImage = getBitmapImageForPath(path);
		int currentWidth = Fixed32.toFP(encodedImage.getWidth());
		int currentHeight = Fixed32.toFP(encodedImage.getHeight());

		int scaleXFixed32 = Fixed32.div(currentWidth, requiredWidth);
		int scaleYFixed32 = Fixed32.div(currentHeight, requiredHeight);

		EncodedImage resizedImage = encodedImage.scaleImage32(scaleXFixed32,
				scaleYFixed32);
		FileConnection fcImg = null;
		String imageExtension = "";
		String imagePathWintoutExtension = path;
		if(path.lastIndexOf('.') != -1)
		{
			imageExtension = path.substring(path.lastIndexOf('.'));
			imagePathWintoutExtension = path.substring(0,path.lastIndexOf('.'));
		}
		String resizedPath = imagePathWintoutExtension + "_" + requiredWidth + "x" + requiredHeight + imageExtension;
		try {
			fcImg = (FileConnection) Connector.open(resizedPath, Connector.WRITE);
			if (!fcImg.exists()) {
				fcImg.create();
				OutputStream out = fcImg.openOutputStream();
				out.write(resizedImage.getData());
				out.flush();
				out.close();
			}
		} catch (Exception e) {
		} finally {
			try {
				if (fcImg != null) {
					fcImg.close();
				}
			} catch (Exception e) {
				return null;
			}
		}
		return resizedPath;
	}

	public static EncodedImage getBitmapImageForPath(String imagePath) {
		FileConnection fconn = null;

		try {
			fconn = (FileConnection) Connector.open(imagePath, Connector.READ);
			if (fconn.exists()) {
				byte[] imageBytes = new byte[(int) fconn.fileSize()];
				InputStream inStream = fconn.openInputStream();
				inStream.read(imageBytes);
				inStream.close();
				EncodedImage eimg = EncodedImage.createEncodedImage(imageBytes,
						0, (int) fconn.fileSize());
				return eimg;
			}
		} catch (Exception e) {
		} finally {
			try {
				if (fconn != null) {
					fconn.close();;
				}
			} catch (Exception e) {
				return null;
			}
		}
		return null;
	}
}