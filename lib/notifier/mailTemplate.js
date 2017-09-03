function header () {
	return `
		<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<meta name="viewport" content="width=device-width">
		</head>
		<body style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #FFFFFF">
			<div style="min-width: 320px;Margin: 0 auto;background-color: #FFFFFF">
				<div style="background-color:transparent;">
					<div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
						<div style="border-collapse: collapse;display: table;width: 100%;">
							<div style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;background-color: transparent;">
								<div style="background-color: transparent; width: 100% !important;">
									<div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
	`
}

function footer () {
	return `
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</body>
		</html>
	`
}

function content (title, date, imgSrc, text, link) {
	return `
		<div style="color:#000000;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 2px;">	
			<div style="font-size:12px;line-height:14px;color:#000000;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left; border-bottom: 2px solid #000000; ">
				<p style="margin: 0;font-size: 14px;line-height: 17px"><span style="font-size: 18px; line-height: 21px;">
					<strong><span style="line-height: 21px; font-size: 18px;">${title}</span></strong></span>
				</p>
			</div>	
		</div>

		<div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 2px; padding-bottom: 10px;">	
			<div style="font-size:12px;line-height:12px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;">
				<p style="margin: 0;font-size: 12px;line-height: 12px; text-align: right">${date}</p>
			</div>	
		</div>						
											
		<div align="center" class="img-container center" style="padding-right: 0px;  padding-left: 0px;">
			<img class="center" align="center" border="0" src="${imgSrc}" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: 0;height: auto;float: none;width: 100%;max-width: 290px" width="290">
		</div>

		<div style="color:#555555;line-height:120%;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif; padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">	
			<div style="font-size:12px;line-height:14px;color:#555555;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;text-align:left;">
				<p style="margin: 0;font-size: 14px;line-height: 17px">${text}</p>
			</div>	
		</div>													
												
		<div align="center" class="button-container center" style="padding-right: 10px; padding-left: 10px; padding-top:10px; padding-bottom:10px;">
			<a href="${link}" target="_blank" style="display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #000000; background-color: #f0db4f; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; max-width: 167px; width: 127px;width: auto; border-top: 2px solid #000000; border-right: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; padding-top: 5px; padding-right: 20px; padding-bottom: 5px; padding-left: 20px; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;mso-border-alt: none">
		      <span style="font-size:12px;line-height:24px;">Pogledaj na Njuškalu</span>
		    </a>
		</div>
										
		<div style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px;">
			<div align="center"><div style="border-top: 1px solid #CCCCCC; width:100%; line-height:1px; height:1px; font-size:1px;">&#160;</div></div>
		</div>
	`
}

module.exports = {
	header,
	footer,
	content
}