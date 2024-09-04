/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.language = 'vi';
	// config.uiColor = '#AADC6E';
	config.extraPlugins = 'widget';
	config.extraPlugins = 'lineutils';
	config.extraPlugins = 'image2,oembed';
	// config.extraPlugins = 'autogrow';
	// config.autoGrow_minHeight = 200;
	// config.autoGrow_maxHeight = 1000;
	// config.autoGrow_bottomSpace = 50;
	config.allowedContent = true;
	config.removeFormatAttributes = '';
	

	config.extraPlugins = 'btgrid,glyphicons';
	config.allowedContent = true; 
};
