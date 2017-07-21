<?xml version="1.0" encoding="UTF-8"?>
<Export generator="Cache" version="25" zv="Cache for Windows (x86-64) 2017.1 (Build 792)" ts="2017-07-21 13:03:58">
<Class name="fishnet.Utils">
<TimeChanged>64485,44701.531145</TimeChanged>
<TimeCreated>64483,43361.763945</TimeCreated>

<Method name="loadResources">
<Description>
Import Resources from CSV file (x;y)</Description>
<ClassMethod>1</ClassMethod>
<FormalSpec>source:%String,progress:%Boolean</FormalSpec>
<ReturnType>%Status</ReturnType>
<Implementation><![CDATA[
	if '$data(progress) s progress=0
    Set stream=##class(%Stream.FileCharacter).%New()
    Set sc=stream.LinkToFile(source)
    if $$$ISERR(sc) quit sc

    while 'stream.AtEnd {
	    set resource = ##class(fishnet.Resource).%New()
        set str=stream.ReadLine() 
        set resource.code=$piece( str, ";" ,1 ) 
		set resource.name=$ZCVT($piece( str, ";" ,2 ),"W") 
		if (progress) w !, resource.code_"   -  "_resource.name
		do resource.%Save()
    }
    q $$$OK
]]></Implementation>
</Method>

<Method name="loadRegions">
<Description>
Import Regions from CSV file (x;y)</Description>
<ClassMethod>1</ClassMethod>
<FormalSpec>source:%String,progress:%Boolean</FormalSpec>
<ReturnType>%Status</ReturnType>
<Implementation><![CDATA[
	if '$data(progress) s progress=0
    Set stream=##class(%Stream.FileCharacter).%New()
    Set sc=stream.LinkToFile(source)
    if $$$ISERR(sc) quit sc

    while 'stream.AtEnd {
	    set resource = ##class(fishnet.Region).%New()
        set str=stream.ReadLine() 
        set resource.code=$piece( str, ";" ,1 ) 
		set resource.name=$ZCVT($piece( str, ";" ,2 ),"W") 
		if (progress) w !, resource.code_"   -  "_resource.name
		do resource.%Save()
    }
    q $$$OK
]]></Implementation>
</Method>

<Method name="loadCities">
<ClassMethod>1</ClassMethod>
<FormalSpec>source:%String,progress:%Boolean</FormalSpec>
<ReturnType>%Status</ReturnType>
<Implementation><![CDATA[
	if '$data(progress) s progress=0
    Set stream=##class(%Stream.FileCharacter).%New()
    Set sc=stream.LinkToFile(source)
    if $$$ISERR(sc) quit sc
	
	set str=stream.ReadLine() 
    while 'stream.AtEnd {
	    set resource = ##class(fishnet.City).%New()
        set str=stream.ReadLine() 
        set resource.country=$piece( str, "," ,1 ) 
		set resource.city=$piece( str, "," ,2 ) 
		set resource.accent=$piece( str, "," ,3 )
		set resource.region=$piece( str, "," ,4 )
		set resource.pop=$piece( str, "," ,5 )
		set resource.latitude=$piece( str, "," ,6 )
		set resource.longitude=$piece( str, "," ,7 )
		
		if (progress) w !, resource.country_"   -  "_resource.city
		do resource.%Save()
    }
    q $$$OK
]]></Implementation>
</Method>

<Method name="loadTools">
<Description>
Import Tools from CSV file (x;y)</Description>
<ClassMethod>1</ClassMethod>
<FormalSpec>source:%String,progress:%Boolean</FormalSpec>
<ReturnType>%Status</ReturnType>
<Implementation><![CDATA[
	if '$data(progress) s progress=0
    Set stream=##class(%Stream.FileCharacter).%New()
    Set sc=stream.LinkToFile(source)
    if $$$ISERR(sc) quit sc

    while 'stream.AtEnd {
	    set resource = ##class(fishnet.Tool).%New()
        set str=stream.ReadLine() 
        set resource.code=$piece( str, ";" ,1 ) 
		set resource.name=$ZCVT($piece( str, ";" ,2 ),"W") 
		if (progress) w !, resource.code_"   -  "_resource.name
		do resource.%Save()
    }
    q $$$OK
]]></Implementation>
</Method>

<Storage name="Default">
<Type>%Library.CacheStorage</Type>
<DataLocation>^fishnet.UtilsD</DataLocation>
<DefaultData>UtilsDefaultData</DefaultData>
<IdLocation>^fishnet.UtilsD</IdLocation>
<IndexLocation>^fishnet.UtilsI</IndexLocation>
<StreamLocation>^fishnet.UtilsS</StreamLocation>
<Data name="UtilsDefaultData">
<Value name="1">
<Value>%%CLASSNAME</Value>
</Value>
</Data>
</Storage>
</Class>
</Export>
