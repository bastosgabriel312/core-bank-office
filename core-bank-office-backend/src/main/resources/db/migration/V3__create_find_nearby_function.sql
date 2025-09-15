DROP FUNCTION IF EXISTS public.find_nearby_agencies(double precision, double precision, integer, integer);

CREATE OR REPLACE FUNCTION public.find_nearby_agencies(
    p_posx double precision,
    p_posy double precision,
    p_limit integer,
    p_offset integer
)
RETURNS TABLE(
    id bigint,
    name character varying,
    code character varying,
    address character varying,
    state character varying,
    pos_x double precision,
    pos_y double precision,
    active boolean,
    distance double precision
)
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        a.id::bigint AS id,
        a.name AS name,
        a.code AS code,
        a.address AS address,
        a.state AS state,
        a.pos_x AS pos_x,
        a.pos_y AS pos_y,
        a.active AS active,
        ST_Distance(
            ST_SetSRID(ST_MakePoint(a.pos_x, a.pos_y), 4326)::geography,
            ST_SetSRID(ST_MakePoint(p_posx, p_posy), 4326)::geography
        ) AS distance
    FROM agency a
    WHERE a.active = true
    ORDER BY distance
    LIMIT p_limit OFFSET p_offset;
END;
$function$;
